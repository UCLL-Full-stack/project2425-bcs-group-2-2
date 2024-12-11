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



const getUserByUsername = async (username: string): Promise<User | null> => {
    const userPrisma = await prisma.user.findUnique({
        where: { username },
        include: {
            userSettings: true,
            courses:true,
            posts: true,
        },
    });

    if (!userPrisma) {
        console.log(`User with username "${username}" does not exist in the database.`);
        return null;
    }
    return User.from(userPrisma);
};

const createUser = async ({username, password, age, email, bio, creationDate}: User): Promise<User> => {
    console.log("test")
    try {
        const newUserPrisma = await prisma.user.create({
            data: {
                username,
                password,
                age,
                email,
                bio : "",
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
    } catch (error) {
        console.log(error);
        throw new Error("Database error")
    }
};


export default {getAllUsers, createUser, getUserByUsername};
