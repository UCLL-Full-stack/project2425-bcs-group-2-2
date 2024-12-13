import {
    User as UserPrisma,
    Post as PostPrisma,
    Course as CoursePrisma
} from '@prisma/client';
import { Course } from "./course";
import { Post } from "./post";


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

    getUsername(): string | undefined {
        return this.username;
    }

    static from ({
        id,
        username,
        password,
        age,
        email,
        bio,
        creationDate,
        courses,
        posts
    }: UserPrisma & {courses: CoursePrisma[]; posts: PostPrisma[]}) {
        return new User({
            id,
            username,
            password,
            age,
            email,
            bio,
            creationDate,
            courses: courses.map((course:any)=>Course.from(course)),
            posts: posts.map((post:any)=>Post.from(post))
    })
    }
}
