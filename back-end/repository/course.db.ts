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

const getCourseByDifficulty = async (level: number): Promise<Course[]> => {
    const coursesPrisma = await prisma.course.findMany({
        where: { difficultyLevel: { equals: level } },
    });

    if (!coursesPrisma) {
        return [];
    }

    return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma));
};

const getCoursesWithRatingGreaterThan = async (rating: number): Promise<Course[]> => {
    const coursesPrisma = await prisma.course.findMany({
        where: {
            rating: {
                gt: rating,
            },
        },
    });

    if (!coursesPrisma) {
        return [];
    }

    return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma));
};

const createCourse = async ({ name, difficultyLevel, length, rating }: Course): Promise<Course> => {
    try {
        const newCoursePrisma = await prisma.course.create({
            data: {
                name,
                difficultyLevel,
                length,
                rating,
            },
            include: {
                users: true,
                posts: true,
            },
        });

        return Course.from(newCoursePrisma);
    } catch (error) {
        console.error('Error creating course:', error);
        throw new Error('Failed to create course.');
    }
};

export default {
    getAllCourses,
    getCourseById,
    getCoursesWithRatingGreaterThan,
    getCourseByDifficulty,
    createCourse,
};
