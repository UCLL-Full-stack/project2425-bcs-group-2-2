import { User } from "@/types";


const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
}

const signupUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
}

const getUser =  (userUsername: string) => {
    // Construct the URL with the username as a path parameter
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
    console.log(token);

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userUsername}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const getUsers = () => {
    // Construct the URL with the username as a path parameter
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/users/all", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
};


const UserService = {
    loginUser,signupUser, getUser, getUsers
};

export default UserService;