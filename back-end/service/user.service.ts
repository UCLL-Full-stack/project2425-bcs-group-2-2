import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { AuthenticationResponse } from '../types';

import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const createUser = async ({
    username,
    password,
    age,
    email,
    bio
}: UserInput): Promise<User> => {
    // if (getUserByUsername(username) != null){
    //     throw new Error("User already exist")
    // }
    

    console.log('triger')

    const hashedPassword = await bcrypt.hash(password, 12)

    const creationDate = new Date();
    const user = new User({username, password: hashedPassword, age, email, bio, creationDate});
    console.log(getUserByUsername(username));
    return await userDb.createUser(user);
};




const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();



const getUserByUsername = async(username: string): Promise<User | null> => {
    const user = await userDb.getUserByUsername(username);
    return user;
};

const authenticate = async ({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername(username);
    if (user === null){
        throw new Error("user don't exist")
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('incorrect password')
    }


    return {
        token: generateJwtToken(username),
        username
    };
}

// const putUserCoursesById = (idUser: number, idCourse: number) : void => {
//     const course = courseDb.getCourseById(idCourse);
//     console.log(course)
//     const user = getUserById(idUser);
//     console.log(user)
//     if(!course) throw new Error();
//     user.setCourse(course);
//     console.log(user)

// }

// export default { getAllUsers, getUserById, createUser, putUserCoursesById };
export default { getAllUsers,  createUser, getUserByUsername, authenticate};


