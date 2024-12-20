import courseDb from '../repository/course.db';
import { Course } from '../model/course';
import { CourseInput, Role } from '../types';
import { UnauthorizedError } from 'express-jwt';

const getAllCourses = async (role: string): Promise<Course[]> => {

   
    if (role === "premium") {
        const courses = await courseDb.getAllCourses();
        if (!courses) {
            throw new Error('No courses found.');
        }
        return courses;
    } else if (role === "regular") {
        const courses = await courseDb.getAllCoursesLowerThan3();
        if (!courses) {
            throw new Error('No courses found.');
        }
        return courses;
    } else{
        throw new UnauthorizedError('credentials_required',{
            message: "You are not authorized to access this resource."
        });
    }
};


const getCourseById = async (id: number): Promise<Course> => {
    const course = await courseDb.getCourseById(id);

    if (!course) {
        throw new Error(`Course with id ${id} does not exist`);
    }

    return course;
};









export default {
    getAllCourses,
    getCourseById,
};
