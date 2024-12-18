import Register from "@/components/signUp";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Users: React.FC = () => {
    const router = useRouter();
  const [session, setSession] = useState<string>(null);

  useEffect(()=> {
    setSession(sessionStorage.getItem("loggedInUser"));


  }, [])

    if(session){
      const parsedSession = JSON.parse(session); 
      const username = parsedSession.username; 
      router.push(`/users/${username}`);
      
    } 


      



  return (
    <>  
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <strong>Error: </strong> You need to connect if you want to access this page access this page
          </div>
    </>
  );
};

export default Users;
