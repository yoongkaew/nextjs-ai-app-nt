import Image from "next/image";
import type { Course } from "@/services/course";

type Props = {
  courses: Course[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl border-b border-border pb-8">
        <p className="text-eyebrow text-tertiary">Curriculum</p>
        <h2 className="text-h1 mt-3">หลักสูตรทั้งหมด</h2>
        <p className="text-body-lg mt-4 text-muted-foreground">
          No complex configs. Just copy, paste, and start building.
        </p>
      </div>
      <div className="mt-16 grid w-full gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <div className="group flex w-full flex-col text-start" key={course.title}>
            <span className="text-mono text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative mt-4 mb-6 aspect-4/5 w-full overflow-hidden border border-border">
              <Image
                alt={course.title}
                className="size-full bg-muted object-cover transition-transform duration-500 group-hover:scale-105"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={course.picture}
                loading="eager"
              />
            </div>
            <h3 className="text-h3">{course.title}</h3>
            <p className="text-body mt-2 max-w-[32ch] text-muted-foreground">
              {course.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCourse;
