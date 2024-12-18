import { useEffect, useState } from "react";

const getAllCourses = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
  
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
};

const fetchCourseByID = async (id: string) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/courses/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


};

const CourseService = {
  getAllCourses, fetchCourseByID
};

export default CourseService;