import CourseDetails from "@/components/courseDetails";
import CourseService from "@/service/courseService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const CoursePage = () => {
  const router = useRouter();
  const { id } = router.query;




  const getCoursesById = async () => {
    const response = await CourseService.fetchCourseByID(id as string);

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

  const { data, isLoading, error } = useSWR(`getCoursesById`, getCoursesById);



  return (


    <div>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {data && <CourseDetails course={data} />}
    </div>
  );
};

export default CoursePage;
