import UserOverview from "@/components/users/UserOverview";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Users: React.FC = () => {
  const router = useRouter();
  const {userUsername} = router.query;

  const getUser = async () => {
    const response = await UserService.getUser(userUsername as string);

    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(errorResponse.message);
      throw error;
    }

    const userr = await response.json()
    return userr;
  }

const { data, isLoading, error } = useSWR(
  `user-${userUsername}`,
  getUser
);

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>User</h1>
        <div>

        {error && <div className="text-red-800">Error: {error.message}</div>}
        {isLoading && <p>Loading ..</p>}
          {data&&(
            <p>{data.username}</p>
          )}
        </div>
      </main>
    </>
  );
};
export default Users;




