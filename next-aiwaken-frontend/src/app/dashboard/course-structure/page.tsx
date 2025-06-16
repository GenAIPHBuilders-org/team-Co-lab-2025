"use client";
import { CourseStructure } from "@/components/course-structure/course-structure";
import { courseData } from "./data";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="container mx-auto py-8 px-4">
        <CourseStructure courseData={courseData} />
      </div>
    </div>
  );
}
