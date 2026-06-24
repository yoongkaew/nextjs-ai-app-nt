// src/services/course.ts
// Service layer for course data fetching.

export type Course = {
  id: number;
  title: string;
  detail: string;
  picture: string;
};

type CourseApiResponse = {
  data: Course[];
};

const COURSE_API_URL = "https://api.codingthailand.com/api/course";

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(COURSE_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  const result: CourseApiResponse = await response.json();

  return result.data ?? [];
}
