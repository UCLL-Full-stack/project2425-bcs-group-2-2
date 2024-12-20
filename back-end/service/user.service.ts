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
    bio,
    role
}: UserInput): Promise<User> => {

    


    const hashedPassword = await bcrypt.hash(password, 12)

    const creationDate = new Date();
    const user = new User({username, password: hashedPassword, age, email, bio, creationDate, role: "regular"});
    return await userDb.createUser(user);
};





const getUserByUsername = async(username: string): Promise<User | null> => {
    const user = await userDb.getUserByUsername(username);
    return user;
    
};

const updateUserByUsername = async(username: string, bio: string): Promise<User | null> => {
    const user = await userDb.updateUserByUsername(username, bio);
    return user;
};

const deleteUserByUsername = async(username: string): Promise<User| null> => {
    const user = await userDb.deleteUserByUsername(username);
    return user;
}

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
        token: generateJwtToken({username, role: user.role }),
        username,
        role: user.role
    };
}

export default {  createUser, getUserByUsername, authenticate, deleteUserByUsername, updateUserByUsername};


