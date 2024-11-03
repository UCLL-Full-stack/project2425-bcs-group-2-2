import { Course } from '../model/course';
import { CourseInput } from '../types';

let currentId = 1;

const courses: Course[] = [];
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
    return course;
};

const getAllCourses = (): Course[] => courses;

const getCourseById = (id: number): Course | undefined =>
    courses.find((course) => course.getId() === id);

export default { getAllCourses, getCourseById };
