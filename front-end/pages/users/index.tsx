import Register from "@/components/signUp";
import Head from "next/head";
import { useRouter } from "next/router";


const Users: React.FC = () => {
    const router = useRouter();

    const session = sessionStorage.getItem("loggedInUser");
    const parsedSession = JSON.parse(session); 
    const username = parsedSession.username; 

      

    setTimeout(() => {
        router.push(`/users/${username}`);
      }, 100);

  return (
    <>  
    </>
  );
};

export default Users;
