import ChangeBioForm from "@/components/users/ChangeBioForm";
import DeleteButton from "@/components/users/DeleteButton";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";



const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


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
      <main className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">User Details</h1>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <strong>Error:</strong> {error.message}
          </div>
        )}


        {isLoading && hasSession && <p className="text-center text-gray-500">Loading...</p>}

        {data && hasSession && (
          <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <p className="text-lg font-semibold text-gray-800">
              Username: <span className="text-blue-600">{data.username}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Email: <span className="text-blue-600">{data.email}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Age: <span className="text-blue-600">{data.age}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Bio: <span className="text-blue-600">{data.bio}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Created On: <span className="text-blue-600">{formatDate(data.creationDate)}</span>
            </p>
          </div>
        )}

        {hasSession && <ChangeBioForm />}

        {hasSession && <DeleteButton />}

      </main>
    </>
  );
};

export default Users;
