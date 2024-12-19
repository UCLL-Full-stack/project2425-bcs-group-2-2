import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const formatDate = (isoDate: Date): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

type Props = {
  user: User
  bio: String
}





const UserOverview: React.FC<Props> = ({user, bio}: Props) => {
  return (
    <>
          <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <p className="text-lg font-semibold text-gray-800">
              Username: <span className="text-blue-600">{user.username}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Email: <span className="text-blue-600">{user.email}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Age: <span className="text-blue-600">{user.age}</span>
            </p>

            <p className="text-lg font-semibold text-gray-800">
              Bio: <span className="text-blue-600">{bio}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Created On: <span className="text-blue-600">{formatDate(user.creationDate)}</span>
            </p>
          </div>
    </>
  );
};
export default UserOverview;