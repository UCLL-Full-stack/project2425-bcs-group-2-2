import Register from "@/components/signUp";
import UserService from "@/service/userService";
import Head from "next/head";
import { useRouter } from "next/router";


const DeleteButton: React.FC = () => {
    const router = useRouter();

    const deleteButtonHandler = async () => {
        window.location.href = '/login';
                
        
        const session = sessionStorage.getItem("loggedInUser");
        const parsedSession = JSON.parse(session);
        const username = parsedSession.username;
        await UserService.deleteUser(username as string);

    
        
        sessionStorage.removeItem("loggedInUser");
          
      };

    return (
        <>
            <button
                onClick={deleteButtonHandler}
                className="w-full bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-transform duration-200 transform hover:scale-105">
                Delete User
            </button>
        </>
    );
};

export default DeleteButton;
