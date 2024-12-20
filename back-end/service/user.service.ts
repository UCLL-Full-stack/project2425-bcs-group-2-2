import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput, AuthenticationResponse } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const createUser = async ({ username, password, age, email, bio }: UserInput): Promise<User> => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username. Username must be a non-empty string.');
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new Error('Invalid password. Password must be a non-empty string.');
    }
    if (!age || typeof age !== 'number' || age <= 0) {
        throw new Error('Invalid age. Age must be a positive number.');
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error('Invalid email address.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const creationDate = new Date();
    const role = "regular"
    const user = new User({username, password: hashedPassword, age, email, role , bio, creationDate});
    return await userDb.createUser(user);
};







const getUserByUsername = async (username: string): Promise<User | null> => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username. Username must be a non-empty string.');
    }

    const user = await userDb.getUserByUsername(username);
    if (!user) {
        throw new Error(`User with username "${username}" does not exist.`);
    }
    return user;
};

const updateUserByUsername = async (username: string, bio: string): Promise<User | null> => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username. Username must be a non-empty string.');
    }
    if (!bio || typeof bio !== 'string') {
        throw new Error('Invalid bio. Bio must be a non-empty string.');
    }

    const user = await userDb.updateUserByUsername(username, bio);
    if (!user) {
        throw new Error(`Failed to update bio for user "${username}".`);
    }
    return user;
};

const deleteUserByUsername = async (username: string): Promise<User | null> => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username. Username must be a non-empty string.');
    }

    const user = await userDb.deleteUserByUsername(username);
    if (!user) {
        throw new Error(`User with username "${username}" does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username. Username must be a non-empty string.');
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new Error('Invalid password. Password must be a non-empty string.');
    }

    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('Invalid credentials.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid credentials.');
    }

    return {
        token: generateJwtToken({username, role: user.role }),
        username,
        role: user.role
    };
};

export default { createUser, getUserByUsername, authenticate, deleteUserByUsername, updateUserByUsername};


