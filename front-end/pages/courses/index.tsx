import Header from "@/components/header";
import Head from "next/head";
import CourseHeader from "@/components/coursesHeader";

const Courses: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
      </Head>

      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Courses</h1>
        <section>
          <CourseHeader />
        </section>
      </main>
    </>
  );
};
export default Courses;
