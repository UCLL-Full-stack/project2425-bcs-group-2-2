export class Course {

    private id?: number;
    private name: string;
    private creationDate: Date;
    private difficultyLevel: number;
    private lenght: number;
    private rating: number;

    constructor(course: {
        id?: number;
        name: string;
        creationDate: Date;
        difficultyLevel: number;
        lenght: number;
        rating: number;

    }) {
        this.id = course.id;
        this.name = course.name;
        this.creationDate = course.creationDate;
        this.difficultyLevel = course.difficultyLevel;
        this.lenght = course.lenght;
        this.rating = course.rating;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getDifficultyLevel(): number {
        return this.difficultyLevel;
    }

    getLenght(): number {
        return this.lenght;
    }

    getRating(): number {
        return this.rating;
    }

}
