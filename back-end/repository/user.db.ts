import { User } from '../model/user';
import { UserSettings } from '../model/userSettings';
import { UserInput } from '../types';
import database from '../util/database';

let currentUserId = 1;


const getAllUsers = async () : Promise<User[]> => {
    const usersPrisma = await database.user.findMany()
    return usersPrisma.map((userPrisma) => User.from(userPrisma))
}


export default { createUser, getAllUsers, getUserById };
