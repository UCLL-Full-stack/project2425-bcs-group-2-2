import React, { useEffect, useState } from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<String>(null);

  useEffect(()=> {

    const loggedInUser = sessionStorage.getItem("loggedInUser");

    
    if(loggedInUser){
      setLoggedInUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {

      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("token");
    



    setLoggedInUser(null);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold mb-2 text-white">Golden Hands</h1>
        {loggedInUser && (
          <p className="block py-2 px-4 rounded">Welcome {loggedInUser}</p>
        )}
      </div>

      <nav className="mt-6">
        <ul className="flex flex-col space-y-2 px-4">
          <li></li>
          <li>
            <Link href="/courses">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Courses
              </p>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Profile
              </p>
            </Link>
          </li>

          {!loggedInUser && (
            <li>
              <Link href="/signup">
                <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                  Sign Up
                </p>
              </Link>
            </li>
          )}
          {loggedInUser && (
            <li>
              <Link href="/login" onClick={handleLogout}>
                <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                  Logout
                </p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
