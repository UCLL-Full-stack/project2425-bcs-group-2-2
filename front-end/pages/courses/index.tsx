import Header from "@/components/header";
import Head from "next/head";

const Lecturers: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
      </Head>

      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Courses</h1>
        <section>
          <h2>Courses overview</h2>
        </section>
      </main>
    </>
  );
};
export default Lecturers;
