import AddFeedbackForm from "@/components/feedback/addFeedbackForm";
import Head from "next/head";
import { useEffect, useState } from "react";

const Feedback: React.FC = () => {
    const [username, setUsername] = useState("");


    useEffect(() => {
        const username = sessionStorage.getItem("loggedInUser");
        if (username) {
            setUsername(username);
        }
    }, []);



    return (
        <>
            <Head>
                <title>Feedback</title>
            </Head>

            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
   
                    {username && (
                        <AddFeedbackForm />)}
                    {!username && (
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                            <strong>Error: </strong>You need to connect if you want to access this page.
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};
export default Feedback;
