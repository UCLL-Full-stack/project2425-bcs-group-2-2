import {
    Post as PostPrisma,
    Course as CoursePrisma
} from '@prisma/client';

import { Course } from "./course";


export class Post {
    public id?: number; // Optional
    public likes: number; // Optional
    public description: string; // Optional
    public uploadDate: Date; // Optional
    public course?: Course;

    constructor(post: {
        id?: number; // Optional
        likes: number; // Optional
        description: string; // Optional
        uploadDate: Date; // Optional
        course?: Course;

    }) {
        this.id = post.id;
        this.likes = post.likes;
        this.description = post.description;
        this.uploadDate = post.uploadDate;
        this.course = post.course;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getLikes(): number | undefined {
        // Can return undefined
        return this.likes;
    }

    getDescription(): string | undefined {
        // Can return undefined
        return this.description;
    }

    getUploadDate(): Date | undefined {
        // Can return undefined
        return this.uploadDate;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setDescription(description: string): void {
        // Accepts undefined
        this.description = description;
    }

    setUploadDate(uploadDate: Date): void {
        // Accepts undefined
        this.uploadDate = uploadDate;
    }

    static from ({
        id,
        likes,
        description,
        uploadDate,
        course
    }: PostPrisma & {course: CoursePrisma} ) {
        return new Post({
            id,
            likes,
            description,
            uploadDate,
            course: Course.from(course)
    })
    }
}
