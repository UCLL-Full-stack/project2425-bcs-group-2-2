import { Course } from '../../model/course';

const sampleCourse1 = new Course({
    name: 'Test Course',
    difficultyLevel: 3,
    length: 100,
    rating: 5,
    description: 'A sample description',
    materials: ['Sample Material'],
    instructions: ['Step 1'],
});
const validCourseData = {
    id: 1,
    name: 'Introduction to Knitting',
    difficultyLevel: 3,
    length: 120,
    rating: 8,
    description: 'Learn the basics of knitting in this introductory course.',
    materials: ['Yarn', 'Knitting needles'],
    instructions: ['Step 1: Gather materials', 'Step 2: Start knitting'],
    tips: 'Take your time and practice regularly.',
};

test('given: valid values for course, when: creating course, then: course created accordingly', () => {
    const course = new Course(validCourseData);

    expect(course.getId()).toBe(validCourseData.id);
    expect(course.getName()).toBe(validCourseData.name);
    expect(course.getDifficultyLevel()).toBe(validCourseData.difficultyLevel);
    expect(course.getLength()).toBe(validCourseData.length);
    expect(course.getRating()).toBe(validCourseData.rating);
    expect(course.getDescription()).toBe(validCourseData.description);
    expect(course.getMaterials()).toEqual(validCourseData.materials);
    expect(course.getInstructions()).toEqual(validCourseData.instructions);
    expect(course.getTips()).toBe(validCourseData.tips);
});

test('should throw error when name is null or empty', () => {
    expect(() => new Course({ ...validCourseData, name: '' })).toThrow(
        'Name cannot be null or empty.'
    );
});

test('given: invalid value for difficulty, when: creating course, then: error thrown', () => {
    expect(() => new Course({ ...validCourseData, difficultyLevel: 6 })).toThrow(
        'Difficulty level must be between 1 and 5.'
    );
    expect(() => new Course({ ...validCourseData, difficultyLevel: 0 })).toThrow(
        'Difficulty level must be between 1 and 5.'
    );
});

test('given: invalid length, when: setting length, then: throw error', () => {
    expect(() => new Course({ ...validCourseData, length: -10 })).toThrow(
        'Length must be a positive number.'
    );
});

test('given: invalid rating, when: setting rating, then: throw error', () => {
    expect(() => new Course({ ...validCourseData, rating: 11 })).toThrow(
        'Rating must be between 1 and 10.'
    );
    expect(() => new Course({ ...validCourseData, rating: 0 })).toThrow(
        'Rating must be between 1 and 10.'
    );
});

test('should throw error when description is null or empty', () => {
    expect(() => new Course({ ...validCourseData, description: '' })).toThrow(
        'Description cannot be null or empty.'
    );
});

test('should throw error when materials is not a non-empty array', () => {
    expect(() => new Course({ ...validCourseData, materials: [] })).toThrow(
        'Materials must be a non-empty array.'
    );
    expect(() => new Course({ ...validCourseData, materials: null as any })).toThrow(
        'Materials must be a non-empty array.'
    );
});

test('should throw error when instructions is not a non-empty array', () => {
    expect(() => new Course({ ...validCourseData, instructions: [] })).toThrow(
        'Instructions must be a non-empty array.'
    );
    expect(() => new Course({ ...validCourseData, instructions: null as any })).toThrow(
        'Instructions must be a non-empty array.'
    );
});
