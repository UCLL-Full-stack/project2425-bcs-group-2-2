import courseDb from '../../repository/course.db';
import { Course } from '../../model/course';

beforeEach(() => {
    jest.clearAllMocks();
});

test('given: a mocked course, when: using it, then: verify its properties', () => {
    const mockCourse = new Course({
        id: 1,
        name: 'Test Course',
        difficultyLevel: 3,
        length: 120,
        rating: 8,
        description: 'This is a test course.',
        materials: ['Yarn', 'Needles'],
        instructions: ['Step 1', 'Step 2'],
    });

    expect(mockCourse.name).toBe('Test Course');
    expect(mockCourse.difficultyLevel).toBe(3);
    expect(mockCourse.length).toBe(120);
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
