import { User } from '../../model/user';
import { Course } from '../../model/course';
import { Post } from '../../model/post';

const validUserData = {
    id: 1,
    username: 'testuser',
    password: 'securepassword',
    age: 25,
    email: 'testuser@example.com',
    bio: 'This is a test bio.',
    creationDate: new Date(),
    courses: [
        new Course({
            id: 1,
            name: 'Sample Course',
            difficultyLevel: 3,
            length: 120,
            rating: 8,
            description: 'Sample description',
            materials: ['Sample Material'],
            instructions: ['Step 1'],
        }),
    ],
    posts: [
        new Post({
            id: 1,
            likes: 10,
            description: 'Test post',
            uploadDate: new Date(),
        }),
    ],
};

test('given: valid values for user, when: creating user, then: user created accordingly', () => {
    const user = new User(validUserData);

    expect(user.id).toBe(validUserData.id);
    expect(user.username).toBe(validUserData.username);
    expect(user.password).toBe(validUserData.password);
    expect(user.age).toBe(validUserData.age);
    expect(user.email).toBe(validUserData.email);
    expect(user.bio).toBe(validUserData.bio);
    expect(user.creationDate).toBe(validUserData.creationDate);
    expect(user.courses).toEqual(validUserData.courses);
    expect(user.posts).toEqual(validUserData.posts);
});

test('given: user tries to login, when: username is empty, then: error thrown', () => {
    expect(() => new User({ ...validUserData, username: '' })).toThrow(
        'Username cannot be null or empty.'
    );
});

test('given: user tries to login, when: password is empty, then: error thrown', () => {
    expect(() => new User({ ...validUserData, password: '' })).toThrow(
        'Password cannot be null or empty.'
    );
});

test('given: user tries to login, when: age is negative, then: error thrown', () => {
    expect(() => new User({ ...validUserData, age: 0 })).toThrow('Age must be a positive number.');
    expect(() => new User({ ...validUserData, age: -5 })).toThrow('Age must be a positive number.');
});

test('given: user tries to login, when: email is invalid, then: error thrown', () => {
    expect(() => new User({ ...validUserData, email: 'invalid-email' })).toThrow(
        'Invalid email address.'
    );
    expect(() => new User({ ...validUserData, email: '' })).toThrow('Invalid email address.');
});

test('should throw error when bio is not a string', () => {
    expect(() => new User({ ...validUserData, bio: null as any })).toThrow('Bio must be a string.');
});
