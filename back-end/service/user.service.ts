import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { UserSettings } from '../model/userSettings';

const createUser = ({
    name,
    age,
    password,
    email,
    bio,
}   
    :UserInput): User => {

    const currentDate = new Date();

    const defaultSettings = new UserSettings({theme:"default theme", notificationsEnabled:true, language:"english"});

    const user = new User({name, age, password, email, bio, creationDate:currentDate, userSettings:defaultSettings, posts:[]
    })

    return userDb.createUser(user);
};

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist`);
    return user;
};

export default { getAllUsers, getUserById, createUser };
