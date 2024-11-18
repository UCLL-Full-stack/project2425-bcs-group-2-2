// import courseDb from '../repository/course.db';
import { Course } from '../model/course';
import { CourseInput } from '../types';

// const createCourse = ({
//     name,
//     creationDate,
//     difficultyLevel,
//     length,
//     rating,
// }: CourseInput): Course => {
//     const course = new Course({
//         name,
//         creationDate,
//         difficultyLevel,
//         length,
//         rating,
//     });
    
//     return courseDb.createCourse(course);
   
// };

// const getAllCourses = async (): Promise<Course[]> => courseDb.getAllCourses();

// const getCourseById = async (id: number): Promise<Course> => {
//     const course = await courseDb.getCourseById(id);
//     if (!course) throw new Error(`Course with id ${id} does not exist`);
//     return course;
// };

// export default { getAllCourses, getCourseById, createCourse };
