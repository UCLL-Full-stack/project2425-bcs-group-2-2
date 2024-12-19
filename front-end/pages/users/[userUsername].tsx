import ChangeBioForm from "@/components/users/ChangeBioForm";
import DeleteButton from "@/components/users/DeleteButton";
import UserOverview from "@/components/users/UserOverview";
import UserService from "@/service/userService";
import { User } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";






const Users: React.FC = () => {
  const router = useRouter();
  const { userUsername } = router.query;
  const [hasSession, setHasSession] = useState(null);


  const getUser = async () => {
    const response = await UserService.getUser(userUsername as string);

    if (!response.ok) {
      const errorResponse = await response.json();
      
      if (errorResponse.message==="jwt malformed"){
        throw new Error("You need to connect if you want to access this page access this page")
      }

      const error = new Error(errorResponse.message);
      throw error;
    }

    return await response.json();
  };

  const { data, isLoading, error } = useSWR(`user-${userUsername}`, getUser);

  useEffect(() => {
    setHasSession(sessionStorage.getItem("loggedInUser"));
  }, [])


  useInterval(() => {
    mutate(`user-${userUsername}`, getUser)
  }, 200)




  return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <strong>Error:</strong> {error.message}
          </div>
        )}

      {data  && (
      <main className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg space-y-8">

        <h1 className="text-2xl font-bold text-center text-gray-800">User Details</h1>
        {isLoading  && <p className="text-center text-gray-500">Loading...</p>}




      <UserOverview user={data} />
      <ChangeBioForm />
      <DeleteButton />

      </main>)}
    </>
  );
};

export default Users;
