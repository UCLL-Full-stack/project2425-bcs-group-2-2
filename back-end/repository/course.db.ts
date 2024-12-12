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

const createCourse = async ({
    name,
    difficultyLevel,
    length,
    rating,
    description,
    materials,
    instructions,
}: Course): Promise<Course> => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const newCourse = await prisma.course.create({
                data: {
                    name,
                    difficultyLevel,
                    length,
                    rating,
                    description,
                    materials,
                    instructions,
                },
            });

            return newCourse;
        });

        return Course.from(result);
    } catch (error) {
        console.error('Error creating course and details:', error);
        throw new Error('Failed to create course and its details.');
    }
};

const deleteCourse = async (id: number) => {
    // Check if the course exists
    const courseExists = await prisma.course.findUnique({
        where: { id },
    });

    if (!courseExists) {
        throw new Error(`Course with ID ${id} does not exist.`);
    }

    // Proceed to delete
    await prisma.course.delete({
        where: { id },
    });

    return `Course ${id} deleted`;
};

const deleteAllCourses = async () => {
    await prisma.course.deleteMany();
    return `courses deleted!`;
};
export default {
    getAllCourses,
    getCourseById,
    getCoursesWithRatingGreaterThan,
    getCourseByDifficulty,
    createCourse,
    deleteCourse,
    deleteAllCourses,
};
