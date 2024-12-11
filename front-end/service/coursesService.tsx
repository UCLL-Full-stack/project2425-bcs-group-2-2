const getAllCourses = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/courses`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default getAllCourses;
