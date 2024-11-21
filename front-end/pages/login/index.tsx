import LoginWindow from "@/components/login";
import Head from "next/head";

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginWindow />
    </>
  );
};

export default Login;
