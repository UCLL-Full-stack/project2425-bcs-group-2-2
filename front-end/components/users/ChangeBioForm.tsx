import UserService from "@/service/userService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useState } from "react";

const ChangeBioForm: React.FC = () => {
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setBioError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    if (!bio.trim()) {
      setBioError("Bio field is empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) return;

    
    const session = sessionStorage.getItem("loggedInUser");
    const parsedSession = JSON.parse(session);
    const username = parsedSession.username;

    const response = await UserService.updateUser(username as string, bio as string);

    if (response.status === 200) {
      setStatusMessages([{ message: "Bio updated successfully.", type: "success" }]);
    } else {
      setStatusMessages([{ message: "Failed to update bio. Try again.", type: "error" }]);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      {statusMessages.length > 0 && (
        <ul className="mb-4 space-y-2">
          {statusMessages.map(({ message, type }, index) => (
            <li
              key={index}
              className={classNames(
                "p-3 rounded-lg text-sm font-medium",
                type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              )}
            >
              {message}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="w-full">
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Write something about yourself..."
            className="w-full h-24 border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            onChange={(e) => setBio(e.target.value)}
          />
          {bioError && <p className="mt-2 text-sm text-red-600">{bioError}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-transform duration-200 transform hover:scale-105"
        >
          Update Bio
        </button>
      </form>
    </div>
  );
};

export default ChangeBioForm;
