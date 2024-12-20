import AnonymousFeedbackService from "@/service/anonymousFeedbackService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const addFeedbackForm: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setSubjectError(null);
    setBodyError(null);
    setStatusMessages([]);
  }

  const validate = (): boolean => {
    clearErrors();
  
    let isValid = true; 
  
    if (!subject || subject.trim() === "") {
      setSubjectError("Subject is required");
      isValid = false; 
    }
  
    if (!body || body.trim() === "") {
      setBodyError("Body is required");
      isValid = false; 
    }
  
    return isValid; 
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const feedback = { subject, body};
    const response = await AnonymousFeedbackService.addFeedack(feedback);

    if (response.status === 200) {

      setStatusMessages([
        {
          message: `Thank you for your feedback. Redirecting you to the home page ...`,
          type: "success",
        },
      ]);    

      setTimeout(() => {
        router.push('/');
      }, 2000);
    
      
    } else {
      setStatusMessages([
        {
          message: `Submitting feedback didn't succeed. Please try again`,
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
            Write a feedback to the developers
          </h1>
          <p>No worries it's anonymous :)</p>

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
                Subject
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setSubject(event.target.value)}
              />
              {subjectError && <div className="text-red-800 ">{subjectError}</div>}

            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Body
              </label>
              <textarea
                id="lastname"
                name="lastname"
                placeholder="Write us something"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
                onChange={(event) => setBody(event.target.value)}

              />
              {bodyError && (
                <div className=" text-red-800">{bodyError}</div>
              )}
            </div>
            
            
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition-colors mt-6"
              >
                Submit
              </button>
          </form>
         
        </div>
      </div>
    </>
  );
};

export default addFeedbackForm;
