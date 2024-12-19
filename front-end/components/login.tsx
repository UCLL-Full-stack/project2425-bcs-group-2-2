import UserService from "../service/userService";
import { StatusMessage } from "../types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import classNames from "classnames";

const LoginWindow: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username && username.trim() === "") {
      setUsernameError("Name is required");
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { username, password };
    const response = await UserService.loginUser(user);

    if (response.status === 200) {
      setStatusMessages([
        {
          message: `Login succesful. Redirecting to homepage...`,
          type: "success",
        },
      ]);

      const user = await response.json();

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          username: user.username,
        })
      );
      setTimeout(() => {
        //router.push('/courses'); -> don't use this because sidebar don't refresh in that case
        window.location.href = "/courses";
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: `Login didn't succeed. Please try again`,
          type: "error",
        },
      ]);
    }
  };
  return (
    <>
      <div className="form-container flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 text-black">
        <div className="max-w-md w-[90%] bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Login
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Log in to access your account
          </p>
          {statusMessages && (
            <div className="row">
              <ul className="list-none mb-3 mx-auto ">
                {statusMessages.map(({ message, type }, index) => (
                  <li
                    key={index}
                    className={classNames({
                      "text-red-800": type === "error",
                      "text-green-800": type === "success",
                    })}
                  >
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="name"
                id="email"
                name="email"
                placeholder="johndoe"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setUsername(event.target.value)}
              />
              {usernameError && (
                <div className="text-red-800 ">{usernameError}</div>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && (
                <div className=" text-red-800">{passwordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition-colors mt-6"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginWindow;
