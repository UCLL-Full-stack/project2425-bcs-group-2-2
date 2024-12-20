import { User } from '../../model/user';
import { Course } from '../../model/course';
import { Post } from '../../model/post';
import { Role } from '../../types';

const validUserData = {
    id: 1,
    username: 'testuser',
    password: 'securepassword',
    age: 25,
    email: 'testuser@example.com',
    bio: 'This is a test bio.',
    creationDate: new Date(),
    role: 'guest' as Role,
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
    expect(user.role).toBe(validUserData.role);
    expect(user.courses).toEqual(validUserData.courses);
    expect(user.posts).toEqual(validUserData.posts);
});

test('should throw error when username is null or empty', () => {
    expect(() => new User({ ...validUserData, username: '' })).toThrow(
        'Username cannot be null or empty.'
    );
});

test('should throw error when password is null or empty', () => {
    expect(() => new User({ ...validUserData, password: '' })).toThrow(
        'Password cannot be null or empty.'
    );
});

test('should throw error when age is not a positive number', () => {
    expect(() => new User({ ...validUserData, age: 0 })).toThrow('Age must be a positive number.');
    expect(() => new User({ ...validUserData, age: -5 })).toThrow('Age must be a positive number.');
});

test('should throw error when email is invalid', () => {
    expect(() => new User({ ...validUserData, email: 'invalid-email' })).toThrow(
        'Invalid email address.'
    );
    expect(() => new User({ ...validUserData, email: '' })).toThrow('Invalid email address.');
});
