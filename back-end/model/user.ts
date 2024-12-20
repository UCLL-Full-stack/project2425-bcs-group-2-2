import { User as UserPrisma, Post as PostPrisma, Course as CoursePrisma } from '@prisma/client';
import { Course } from './course';
import { Post } from './post';

export class User {
    public id?: number;
    public username: string;
    public password: string;
    public age: number;
    public email: string;
    public bio: string;
    public creationDate: Date;
    public courses?: Course[];
    public posts?: Post[];

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        age: number;
        email: string;
        bio: string;
        creationDate: Date;
        courses?: Course[];
        posts?: Post[];
    }) {
        // Validation for username
        if (!user.username || typeof user.username !== 'string' || user.username.trim() === '') {
            throw new Error('Username cannot be null or empty.');
        }

        // Validation for password
        if (!user.password || typeof user.password !== 'string' || user.password.trim() === '') {
            throw new Error('Password cannot be null or empty.');
        }

        // Validation for age
        if (user.age <= 0 || typeof user.age !== 'number') {
            throw new Error('Age must be a positive number.');
        }

        // Validation for email
        if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
            throw new Error('Invalid email address.');
        }

        // Validation for courses and posts (optional but must be arrays if provided)
        if (user.courses && !Array.isArray(user.courses)) {
            throw new Error('Courses must be an array.');
        }

        if (user.posts && !Array.isArray(user.posts)) {
            throw new Error('Posts must be an array.');
        }

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.age = user.age;
        this.email = user.email;
        this.bio = user.bio;
        this.creationDate = user.creationDate || new Date();
        this.courses = user.courses;
        this.posts = user.posts;
    }

    // Getter methods
    getUsername(): string | undefined {
        return this.username;
    }

    // Static method to convert Prisma User object to User instance
    static from({
        id,
        username,
        password,
        age,
        email,
        bio,
        creationDate,
        courses,
        posts,
    }: UserPrisma & { courses: CoursePrisma[]; posts: PostPrisma[] }): User {
        return new User({
            id,
            username,
            password,
            age,
            email,
            bio,
            creationDate,
            courses: courses.map((course: any) => Course.from(course)),
            posts: posts.map((post: any) => Post.from(post)),
        });
    }
}
