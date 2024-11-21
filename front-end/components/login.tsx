import Link from "next/link";

const LoginWindow: React.FC = () => {
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
          <form action="#" method="post" className="">
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
                placeholder="johndoe@gmail.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
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
              />
            </div>
            <Link href="/courses">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition-colors mt-6"
              >
                Login
              </button>
            </Link>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginWindow;
