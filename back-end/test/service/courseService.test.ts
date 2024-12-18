import courseDb from '../../repository/course.db';
import { Course } from '../../model/course';

beforeEach(() => {
    jest.clearAllMocks();
});

test('given: create course, when: all values okay, then: course created', async () => {
    let createCourseMock: jest.Mock;
    createCourseMock = jest.fn();
    courseDb.createCourse = createCourseMock;
    const validCourseData = {
        name: 'Test Course',
        difficultyLevel: 3,
        length: 120,
        rating: 8,
        description: 'This is a test course.',
        materials: ['Yarn', 'Needles'],
        instructions: ['Step 1', 'Step 2'],
    };

    // Act: Call the service function
    const course = new Course(validCourseData);
    await courseDb.createCourse(course);

    expect(createCourseMock).toHaveBeenCalledTimes(1);
    expect(createCourseMock).toHaveBeenCalledWith(course);
});

test('given: get all courses, when: courses exist, then: return all courses', async () => {
    let getAllCoursesMock: jest.Mock;
    getAllCoursesMock = jest.fn().mockResolvedValue([
        new Course({
            name: 'Course 1',
            difficultyLevel: 3,
            length: 100,
            rating: 7,
            description: 'Description 1',
            materials: ['x'],
            instructions: ['x'],
        }),
    ]);
    courseDb.getAllCourses = getAllCoursesMock;

    const courses = await courseDb.getAllCourses();

    expect(getAllCoursesMock).toHaveBeenCalledTimes(1);
    expect(courses.length).toBe(1);
    expect(courses[0].name).toBe('Course 1');
});

test('given: get all courses, when: courses exist, then: return all courses', async () => {
    let getAllCoursesMock: jest.Mock;
    getAllCoursesMock = jest.fn().mockResolvedValue([
        new Course({
            name: 'Course 1',
            difficultyLevel: 3,
            length: 100,
            rating: 7,
            description: 'Description 1',
            materials: ['x'],
            instructions: ['x'],
        }),
    ]);
    courseDb.getAllCourses = getAllCoursesMock;

    const courses = await courseDb.getAllCourses();

    expect(getAllCoursesMock).toHaveBeenCalledTimes(1);
    expect(courses.length).toBe(1);
    expect(courses[0].name).toBe('Course 1');
});

test('given: get course by ID, when: course exists, then: return the course', async () => {
    let getCourseByIdMock: jest.Mock;
    getCourseByIdMock = jest.fn().mockResolvedValue(
        new Course({
            name: 'Course by ID',
            difficultyLevel: 2,
            length: 90,
            rating: 6,
            description: 'Description for course by ID',
            materials: ['x'],
            instructions: ['x'],
        })
    );
    courseDb.getCourseById = getCourseByIdMock;

    const course = await courseDb.getCourseById(1);

    expect(getCourseByIdMock).toHaveBeenCalledTimes(1);
    expect(getCourseByIdMock).toHaveBeenCalledWith(1);
    expect(course!.name).toBe('Course by ID');
});

test('given: get courses by difficulty, when: courses exist for difficulty, then: return matching courses', async () => {
    let getCoursesByDifficultyMock: jest.Mock;
    getCoursesByDifficultyMock = jest.fn().mockResolvedValue([
        new Course({
            name: 'Intermediate Course',
            difficultyLevel: 3,
            length: 120,
            rating: 8,
            description: 'Description for intermediate course',
            materials: ['x'],
            instructions: ['x'],
        }),
    ]);
    courseDb.getCourseByDifficulty = getCoursesByDifficultyMock;

    const courses = await courseDb.getCourseByDifficulty(3);

    expect(getCoursesByDifficultyMock).toHaveBeenCalledTimes(1);
    expect(getCoursesByDifficultyMock).toHaveBeenCalledWith(3);
    expect(courses.length).toBe(1);
    expect(courses[0].difficultyLevel).toBe(3);
});

test('given: get courses by rating, when: courses exist with rating greater than value, then: return matching courses', async () => {
    let getCoursesWithRatingGreaterThanMock: jest.Mock;
    getCoursesWithRatingGreaterThanMock = jest.fn().mockResolvedValue([
        new Course({
            name: 'Highly Rated Course',
            difficultyLevel: 4,
            length: 150,
            rating: 9,
            description: 'Highly rated course description',
            materials: ['x'],
            instructions: ['x'],
        }),
    ]);
    courseDb.getCoursesWithRatingGreaterThan = getCoursesWithRatingGreaterThanMock;

    const courses = await courseDb.getCoursesWithRatingGreaterThan(8);

    expect(getCoursesWithRatingGreaterThanMock).toHaveBeenCalledTimes(1);
    expect(getCoursesWithRatingGreaterThanMock).toHaveBeenCalledWith(8);
    expect(courses.length).toBe(1);
    expect(courses[0].rating).toBe(9);
});

test('given: delete course by ID, when: course exists, then: course deleted', async () => {
    let deleteCourseByIdMock: jest.Mock;
    deleteCourseByIdMock = jest.fn().mockResolvedValue(
        new Course({
            name: 'Course to Delete',
            difficultyLevel: 2,
            length: 80,
            rating: 5,
            description: 'Course marked for deletion',
            materials: ['x'],
            instructions: ['x'],
        })
    );
    courseDb.deleteCourse = deleteCourseByIdMock;

    await courseDb.deleteCourse(1);

    expect(deleteCourseByIdMock).toHaveBeenCalledTimes(1);
    expect(deleteCourseByIdMock).toHaveBeenCalledWith(1);
});

test('given: delete all courses, when: courses exist, then: all courses deleted', async () => {
    let deleteAllCoursesMock: jest.Mock;
    deleteAllCoursesMock = jest.fn().mockResolvedValue(undefined);
    courseDb.deleteAllCourses = deleteAllCoursesMock;

    await courseDb.deleteAllCourses();

    expect(deleteAllCoursesMock).toHaveBeenCalledTimes(1);
});
