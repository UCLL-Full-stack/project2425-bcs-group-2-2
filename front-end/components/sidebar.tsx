import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold mb-2 text-white">Golden Hands</h1>
      </div>
      <nav className="mt-6">
        <ul className="flex flex-col space-y-2 px-4">
          <li>
            <Link href="/courses">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Course
              </p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Profile
              </p>
            </Link>
          </li>
          <li>
            <Link href="/saved-courses">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Saved Courses
              </p>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Settings
              </p>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <p className="block py-2 px-4 rounded hover:bg-gray-700 transition">
                Sign Up
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
