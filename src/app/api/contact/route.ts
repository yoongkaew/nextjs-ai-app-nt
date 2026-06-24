import { Resend } from "resend";

import { contactSchema } from "@/lib/validations/contact";

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// POST /api/contact — public (no auth guard)
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "รูปแบบข้อมูลไม่ถูกต้อง" } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง";
    return Response.json(
      { success: false, error: firstError } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  const sender = process.env.CONTACT_SENDER_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !receiver) {
    console.error(
      "Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL environment variable"
    );
    return Response.json(
      {
        success: false,
        error: "ระบบส่งอีเมลยังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแลระบบ",
      } satisfies ApiResponse<never>,
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Contact Form <${sender}>`,
    to: receiver,
    replyTo: email,
    subject: `ข้อความติดต่อใหม่จาก ${name}`,
    text: `ชื่อ: ${name}\nEmail: ${email}\n\nข้อความ:\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      {
        success: false,
        error: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
      } satisfies ApiResponse<never>,
      { status: 502 }
    );
  }

  return Response.json(
    { success: true, data: { sent: true } } satisfies ApiResponse<{ sent: true }>
  );
}
