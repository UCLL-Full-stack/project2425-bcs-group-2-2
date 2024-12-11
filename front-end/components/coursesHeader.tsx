import Link from "next/link";
import { useEffect, useState } from "react";
import getAllCourses from "@/service/coursesService";

interface Course {
  id: number;
  name: string;
  difficultyLevel: string;
  length: number;
  rating: number;
}

const CourseHeader: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const showCourseList = async () => {
    setLoading(true);
    try {
      const data = await getAllCourses();
      console.log(data);

      if (data && Array.isArray(data)) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showCourseList();
  }, []);

  return (
    <>
      <div className="course-header">
        <h1 className="flex text-3xl font-bold justify-center">
          Top 3 Rated Courses
        </h1>
        <div className="flex flex-row items-center justify-between mx-28">
          <Link href="/">Course 1</Link>
          <Link href="/">Course 2</Link>
          <Link href="/">Course 3</Link>
        </div>
        <h2 className="flex text-3xl font-bold justify-center">All Courses</h2>
        <div className="grid-rows-3">
          {loading ? (
            <p>Loading transactions...</p>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="border-l-[0.5em] border-l-blue-300 p-3 mx-4 flex items-center gap-2 border-y border-stone-300 shadow-md rounded-xl"
              >
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-between">
                    <h2 className="p-0 m-0 uppercase text-[1em] font-semibold">
                      {course.name || "Transaction"}
                    </h2>
                    <p className="text-stone-600">{course.rating}</p>
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <h2 className="p-0 m-0 text-dark font-bold">
                      {course.difficultyLevel}
                    </h2>
                    <p className="text-stone-600">{course.rating}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
