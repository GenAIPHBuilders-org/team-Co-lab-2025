import { useEffect, useState } from "react";

export const useLocalCourseData = () => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("courseData");
      if (data) {
        setCourse(JSON.parse(data));
      }
    }
  }, []);

  return course;
};
