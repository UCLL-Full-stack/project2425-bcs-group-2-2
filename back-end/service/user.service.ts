import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const createUser = ({ name, age, email, bio }: UserInput): User => {
    const user = new User({
        name,
        age,
        email,
        bio,
    });
    return userDb.createUser(user);
};

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist`);
    return user;
};

export default { getAllUsers, getUserById, createUser };
