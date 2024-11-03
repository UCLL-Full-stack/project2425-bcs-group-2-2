import { Course } from '../model/course';
import { CourseInput } from '../types';

let currentId = 1;

const courses: Course[] = [
    new Course({
        id: 1,
        name: 'Full-stack sofware development',
        creationDate: new Date(),
        difficultyLevel: 2,
        length: 6,
        rating: 9
    }),
];
const createCourse = ({
    name,
    creationDate,
    difficultyLevel,
    length,
    rating,
}: CourseInput): Course => {
    const course = new Course({
        name,
        creationDate,
        difficultyLevel,
        length,
        rating,
    });
    courses.push(course);
    console.log(courses);
    return course;
};

const getAllCourses = (): Course[] => courses;

const getCourseById = (id: number): Course | undefined =>
    courses.find((course) => course.getId() === id);

export default { createCourse, getAllCourses, getCourseById };
