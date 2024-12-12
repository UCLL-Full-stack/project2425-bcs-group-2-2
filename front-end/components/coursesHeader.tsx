import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/service/coursesService";

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
        <h1 className="flex text-3xl font-bold justify-center">All Courses</h1>
        {/* <div className="flex flex-row items-center justify-between mx-28">
          <Link href="/">Course 1</Link>
          <Link href="/">Course 2</Link>
          <Link href="/">Course 3</Link>
        </div> */}

        <div className="grid grid-cols-2 gap-6 px-6 ">
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div
                  key={course.difficultyLevel}
                  className="border-l-[0.5em] border-l-black p-5 mx-4 flex items-center gap-7 border-y border-stone-300 shadow-md rounded-xl"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-between">
                      <h2 className="p-0 m-0 uppercase text-[1em] font-semibold">
                        {course.name || "Course"}
                      </h2>
                      <p className="text-stone-600">
                        Rating: {course.rating}/10
                      </p>
                    </div>
                    <div className="flex flex-col justify-between text-right">
                      <h2 className="p-0 m-0 text-dark font-bold">
                        Level {course.difficultyLevel}
                      </h2>
                      <p className="text-stone-600">
                        Duration: {course.length}hrs
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
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
