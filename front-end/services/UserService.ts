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

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userUsername}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const deleteUser =  (userUsername: string) => {
    // Construct the URL with the username as a path parameter
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userUsername}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const updateUser =  (userUsername: string, bio: string) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
    console.log(bio);
    console.log(userUsername);


    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userUsername}/${bio}`, {
        method: 'PUT',
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
    loginUser,signupUser, getUser, getUsers, deleteUser, updateUser
};

export default UserService;