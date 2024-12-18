import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

type Props = {
    user: User
}

const UserOverview: React.FC<Props> = ({user}: Props) => {
  return (
    <>
    {user&&(
        <p>{user.username}</p>
    )}
    </>
  );
};
export default UserOverview;