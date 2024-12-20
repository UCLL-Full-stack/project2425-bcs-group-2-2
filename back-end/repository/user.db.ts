import {Prisma, PrismaClient} from '@prisma/client';
import { User } from '../model/user';
import { Course } from '../model/course';
import { Post } from '../model/post';

const prisma = new PrismaClient();





const getUserByUsername = async (username: string): Promise<User | null> => {
    const userPrisma = await prisma.user.findUnique({
        where: { username },
        include: {
            courses:true,
            posts: true,
        },
    });

    if (!userPrisma) {
        return null;
    }
    return User.from(userPrisma);
};

const createUser = async ({username, password, age, email, bio, creationDate, role}: User): Promise<User> => {
    try {
        const newUserPrisma = await prisma.user.create({
            data: {
                username,
                password,
                age,
                email,
                bio : "",
                creationDate,
                role
            },
            include: {
                courses: true,      
                posts: true,        
            },
        });
    
        return User.from(newUserPrisma);
    } catch (error) {
        throw new Error("Database error")
    }
};

const deleteUserByUsername = async (username: string): Promise<User | null> => {
    const deleteUser = await prisma.user.delete({
        where: {
          username
        },
        include: {
            courses:true,
            posts: true,
        }
      })

   
    return User.from(deleteUser);
};


const updateUserByUsername = async (username: string, bio: string): Promise<User | null> => {
    const updateUser = await prisma.user.update({
        where: {
          username
        },
        include: {
            courses:true,
            posts: true,
        },
        data: {
            bio
        },
      })

   
    return User.from(updateUser);
};


export default { createUser, getUserByUsername,deleteUserByUsername, updateUserByUsername};
