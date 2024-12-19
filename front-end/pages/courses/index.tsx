import Head from "next/head";
import CourseHeader from "@/components/courses/coursesHeader";

const Courses: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
      </Head>

      <main className="d-flex flex-column justify-content-center align-items-center">
        <section>
          <CourseHeader />
        </section>
      </main>
    </>
  );
};
export default Courses;
