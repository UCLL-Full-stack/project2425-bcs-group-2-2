import { Course } from '../model/course';
import { CourseInput } from '../types';
import database from '../util/database';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let currentId = 1;

const getAllCourses = async (): Promise<Course[]> => {
    const coursesPrisma = await prisma.course.findMany({});
    return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma));
};

const getAllCoursesLowerThan3 = async (): Promise<Course[]> => {
    const coursesPrisma = await prisma.course.findMany({
        where: {
            difficultyLevel: {
                lte: 2,
            },
        },
    });

    return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma));
};

const getCourseById = async (id: number): Promise<Course | null> => {
    const coursePrisma = await prisma.course.findUnique({
        where: { id },
        include: {
            users: true,
            posts: true,
        },
    });

    if (!coursePrisma) {
        return null;
    }

    return Course.from(coursePrisma);
};


export default {
    getAllCoursesLowerThan3,
    getAllCourses,
    getCourseById,
};
