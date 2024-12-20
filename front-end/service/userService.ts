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

const getUser =  () => {
    const token = sessionStorage.getItem("token");

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const deleteUser =  () => {
    const token = sessionStorage.getItem("token");

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const updateUser =  (bio: string) => {
    const token = sessionStorage.getItem("token");


    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({bio}),

    });
};




const UserService = {
    loginUser,signupUser, getUser, deleteUser, updateUser
};

export default UserService;