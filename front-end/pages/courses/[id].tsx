import CourseDetails from "@/components/courseDetails";
import { fetchCourseByID } from "@/service/coursesService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; // Adjust the import path
const CoursePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic route parameter
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("No id found");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseData = await fetchCourseByID(Number(id));
        setCourse(courseData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course by ID:", err);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <CourseDetails course={course} />
    </div>
  );
};

export default CoursePage;
