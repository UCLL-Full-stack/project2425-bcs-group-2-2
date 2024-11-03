export class User {
    public id?: number;
    public name?: string;
    public age?: number;
    public email?: string;
    public bio?: string;
    public creationDate?: Date;

    constructor(user: {
        id?: number;
        name?: string;
        age?: number;
        email?: string;
        bio?: string;
        creationDate?: Date;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.age = user.age;
        this.email = user.email;
        this.bio = user.bio;
        this.creationDate = user.creationDate || new Date();
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
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

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setAge(age: number | undefined): void {
        this.age = age;
    }

    setEmail(email: string | undefined): void {
        this.email = email;
    }

    setBio(bio: string | undefined): void {
        this.bio = bio;
    }

    setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }
}
