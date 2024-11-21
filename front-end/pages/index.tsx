import Head from "next/head";
import Image from "next/image";

import Header from "@/components/header";
import Register from "@/components/signUp";
import LoginAlert from "@/components/registerButton";
import Sidebar from "@/components/sidebar";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginAlert />

      <main>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/images/knitting-logo.jpg"
            alt="Knitting Logo"
            width={200}
            height={200}
          />
          <h1 className="text-2xl">Welcome!</h1>
        </div>

        <div>
          <p>
            Courses lets you see as a lecturer all the courses you are teaching
            and as a student all the courses you are enrolled in. <br />
            You can also see when the courses are scheduled and the students
            enrolled in each course.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
