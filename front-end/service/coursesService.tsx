const getAllCourses = async () => {
  const token = sessionStorage.getItem("Access_Token");
  const url = process.env.NEXT_PUBLIC_API_URL + `/courses`;
  console.log("fetching from url");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Re-throw the error for calling functions to handle it
  }
};

const fetchCourseByID = async (id: number) => {
  const token = sessionStorage.getItem("Access_Token");
  const url = process.env.NEXT_PUBLIC_API_URL + `/courses/${id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
  }
};

const createCourse = async (
  name: string,
  difficultyLevel: number,
  length: number,
  rating: number
) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/courses`;

  const body = {
    name: name,
    difficultyLevel: difficultyLevel,
    length: length,
    rating: rating,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create course:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }

    const data = await response.json();
    console.log("Course created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating course");
    throw error;
  }
};

export { getAllCourses, createCourse, fetchCourseByID };
