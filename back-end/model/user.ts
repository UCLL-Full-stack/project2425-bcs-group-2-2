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
    public userSettings: UserSettings;
    public posts: Post[];

    constructor(user: {
        id?: number;
        name: string;
        password: string;
        age: number;
        email: string;
        bio: string;
        creationDate: Date;
        userSettings: UserSettings;
        posts: Post[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.age = user.age;
        this.email = user.email;
        this.bio = user.bio;
        this.creationDate = user.creationDate || new Date();
        this.userSettings = user.userSettings;
        this.posts = user.posts;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
    }

    getPassword(): string | undefined {
        return this.password;
    }

    getAge(): number | undefined {
        return this.age;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    getBio(): string | undefined {
        return this.bio;
    }

    getCreationDate(): Date | undefined {
        return this.creationDate;
    }

    getUserSettings(): UserSettings {
        return this.userSettings;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setAge(age: number): void {
        this.age = age;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setBio(bio: string): void {
        this.bio = bio;
    }

    setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }
}
