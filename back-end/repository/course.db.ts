import { Course } from '../model/course';
import { CourseInput } from '../types';
import database from '../util/database';

let currentId = 1;


const getAllCourses = async (): Promise<Course[]> => {
    const coursesPrisma = await database.course.findMany({

    })
    return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma))
}



export default { createCourse, getAllCourses, getCourseById };
