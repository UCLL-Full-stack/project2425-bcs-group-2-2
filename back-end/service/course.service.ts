import courseDb from '../repository/course.db';
import { Course } from '../model/course';
import { CourseInput } from '../types';

const createCourse = async ({
    name,
    difficultyLevel,
    length,
    rating,
}: CourseInput): Promise<Course> => {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid course name.');
    }
    if (
        !difficultyLevel ||
        typeof difficultyLevel !== 'number' ||
        difficultyLevel < 1 ||
        difficultyLevel > 5
    ) {
        throw new Error('Invalid difficulty level. It must be a number between 1 and 5.');
    }
    if (!length || typeof length !== 'number' || length <= 0) {
        throw new Error('Invalid length. It must be a positive number.');
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 10) {
        throw new Error('Invalid rating. It must be a number between 1 and 10.');
    }

    const course = new Course({
        name,
        difficultyLevel,
        length,
        rating,
    });

    return await courseDb.createCourse(course);
};

const getAllCourses = async (): Promise<Course[]> => {
    const courses = await courseDb.getAllCourses();
    return courses;
};

const getCourseById = async (id: number): Promise<Course> => {
    const course = await courseDb.getCourseById(id);

    if (!course) {
        throw new Error(`Course with id ${id} does not exist`); // Standardized error for missing course
    }

    return course;
};

const getCoursesByDifficulty = async (level: number): Promise<Course[]> => {
    const courses = await courseDb.getCourseByDifficulty(level);
    return courses;
};

const getCoursesWithRatingGreaterThan = async (rating: number): Promise<Course[]> => {
    const courses = await courseDb.getCoursesWithRatingGreaterThan(rating);
    return courses;
};
export default {
    getAllCourses,
    getCourseById,
    getCoursesWithRatingGreaterThan,
    getCoursesByDifficulty,
    createCourse,
};
