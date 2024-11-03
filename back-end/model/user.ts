export class User {
    private id?: number;
    private name: string;
    private age: number;
    private email: string;
    private bio: string;
    private creationDate: Date;

    constructor(user: {
        id?: number;
        name: string;
        age: number;
        email: string;
        bio: string;
        creationDate: Date;
    }) 
    {
        this.id = user.id;
        this.name = user.name;
        this.age = user.age;
        this.email = user.email;
        this.bio = user.bio;
        this.creationDate = user.creationDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getEmail(): string {
        return this.email;
    }

    getBio(): string {
        return this.bio;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }
}