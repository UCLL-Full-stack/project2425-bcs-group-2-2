import Link from "next/link";
import useSWR from "swr";
import CourseService from "@/service/courseService";
import { Course } from "@/types";
import { useEffect, useState } from "react";

const CourseHeader: React.FC = () => {
  const [role, setRole] = useState<String>(null);


  const getCourses = async () => {
    const response = await CourseService.getAllCourses();

    if (!response.ok) {
      const errorResponse = await response.json();

      if (errorResponse.message === "jwt malformed") {
        throw new Error("You need to connect if you want to access this page");
      }

      const error = new Error(errorResponse.message);
      throw error;
    }

    return await response.json();
  };


  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      setRole(role);
    }
  }, []);

  const { data, isLoading, error } = useSWR(`getCoursesAll`, getCourses);

  return (
    <>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {data && !error && <h1 className="flex text-3xl  font-bold justify-center">All Courses</h1>}
      {(role === "regular") && (
        <h2 className="text-lg font-semibold text-center mb-5 p-2 rounded-md shadow-sm">
          If you want to see courses with difficulty level above 2, contact the admins.
        </h2>
      )}



      {data && !error && (
        <div className="grid grid-cols-2 gap-6 px-6">
          {data.map((course: Course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="border-l-[0.5em] border-l-black p-5 mx-4 flex items-center gap-7 border-y border-stone-300 shadow-md rounded-xl">
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
          ))}
        </div>
      )}
    </>
  );
};

export default CourseHeader;
