import {Prisma, PrismaClient} from '@prisma/client';
import { User } from '../model/user';
import { Course } from '../model/course';
import { Post } from '../model/post';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    const usersPrisma = await prisma.user.findMany({
        include: {
            userSettings: true, 
            courses: true,      
            posts: true,       
        },
    });
    return usersPrisma.map((userPrisma)=>User.from(userPrisma))
};

const getUserById = async (id: number): Promise<User | null> => {
    const userPrisma = await prisma.user.findUnique({
        where: { id },
        include: {
            userSettings: true,
            courses:true,
            posts: true,
        },
    });

    if (!userPrisma) {
        return null;
    }

    return User.from(userPrisma);
};

const createUser = async ({name, password, age, email, bio, creationDate}: User): Promise<User> => {
    const newUserPrisma = await prisma.user.create({
        data: {
            name,
            password,
            age,
            email,
            bio,
            creationDate,
            userSettings: {
                create: {
                    theme: 'dark',
                    notificationsEnabled: true,
                    language: 'en',
                },
            },
        },
        include: {
            userSettings: true, 
            courses: true,      
            posts: true,        
        },
    });

    return User.from(newUserPrisma);
};






export default {getAllUsers, getUserById, createUser };
