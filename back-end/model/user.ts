import {
    User as UserPrisma,
    UserSettings as UserSettingsPrisma,
    Post as PostPrisma,
    Course as CoursePrisma
} from '@prisma/client';
import { Course } from "./course";
import { Post } from "./post";
import { UserSettings } from "./userSettings";


export class User {
    public id?: number;
    public name: string;
    public password: string;
    public age: number;
    public email: string;
    public bio: string;
    public creationDate: Date;
    public userSettings?: UserSettings;
    public courses?: Course[];
    public posts?: Post[];


    constructor(user: {
        id?: number;
        name: string;
        password: string;
        age: number;
        email: string;
        bio: string;
        creationDate: Date;
        userSettings?: UserSettings;
        courses?: Course[];
        posts?: Post[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.age = user.age;
        this.email = user.email;
        this.bio = user.bio;
        this.creationDate = user.creationDate || new Date();
        this.userSettings = user.userSettings;
        this.courses = user.courses;
        this.posts = user.posts;

    }

    getName(): string | undefined {
        return this.name;
    }

    static from ({
        id,
        name,
        password,
        age,
        email,
        bio,
        creationDate,
        userSettings,
        courses,
        posts
    }: UserPrisma & {userSettings: UserSettingsPrisma; courses: CoursePrisma[]; posts: PostPrisma[]}) {
        return new User({
            id,
            name,
            password,
            age,
            email,
            bio,
            creationDate,
            userSettings: UserSettings.from(userSettings),
            courses: courses.map((course:any)=>Course.from(course)),
            posts: posts.map((post:any)=>Post.from(post))
    })
    }
}
