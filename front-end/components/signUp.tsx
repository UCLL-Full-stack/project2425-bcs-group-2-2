import UserService from "@/service/userService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  }

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

      if (!email && email.trim() === "") {
        setEmailError("Email is required");
        result = false;
      }
  
      if (!age) {
        setAgeError("Age is required");
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



    const user = { username, password, email, age};
    const response = await UserService.signupUser(user);

    if (response.status === 200) {

      setStatusMessages([
        {
          message: `Successful Registration ! Redirecting to the login in page...`,
          type: "success",
        },
      ]);      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: `Registration didn't succeed. Please try again`,
          type: "error",
        },
      ]);    
    }

  }


  return (
    <>
      <div className="form-container flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 text-black">
        <div className="max-w-md w-[90%] bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Sign Up
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Create your account to get started
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
          <form onSubmit={handleSubmit} action="#" method="post" className="">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setUsername(event.target.value)}
              />
              {usernameError && <div className="text-red-800 ">{usernameError}</div>}

            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setPassword(event.target.value)}

              />
              {passwordError && (
                <div className=" text-red-800">{passwordError}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name.surname@gmail.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setEmail(event.target.value)}

              />
              {emailError && <div className="text-red-800 ">{emailError}</div>}

            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="password"
                name="password"
                placeholder="age"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setAge(Number(event.target.value))}

              />
            {emailError && <div className="text-red-800 ">{emailError}</div>}
            </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
