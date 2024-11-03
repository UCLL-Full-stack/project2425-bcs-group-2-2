export class Course {
    public id?: number;
    public name?: string;
    public creationDate?: Date;
    public difficultyLevel?: number;
    public length?: number;
    public rating?: number;

    constructor(course: {
        id?: number;
        name?: string;
        creationDate?: Date;
        difficultyLevel?: number;
        length?: number;
        rating?: number;
    }) {
        this.id = course.id;
        this.name = course.name;
        this.creationDate = course.creationDate;
        this.difficultyLevel = course.difficultyLevel;
        this.length = course.length;
        this.rating = course.rating;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
    }

    getCreationDate(): Date | undefined {
        // Can return undefined
        return this.creationDate;
    }

    getDifficultyLevel(): number | undefined {
        // Can return undefined
        return this.difficultyLevel;
    }

    getLength(): number | undefined {
        // Can return undefined
        return this.length;
    }

    getRating(): number | undefined {
        // Can return undefined
        return this.rating;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setCreationDate(creationDate: Date | undefined): void {
        // Accepts undefined
        this.creationDate = creationDate;
    }

    setDifficultyLevel(difficultyLevel: number | undefined): void {
        // Accepts undefined
        if (difficultyLevel !== undefined && (difficultyLevel < 1 || difficultyLevel > 5)) {
            throw new Error('Difficulty level must be between 1 and 5.');
        }
        this.difficultyLevel = difficultyLevel;
    }

    setLength(length: number | undefined): void {
        // Accepts undefined
        if (length !== undefined && length < 0) {
            throw new Error('Length must be a positive number.');
        }
        this.length = length;
    }

    setRating(rating: number | undefined): void {
        // Accepts undefined
        if (rating !== undefined && (rating < 1 || rating > 10)) {
            throw new Error('Rating must be between 1 and 10.');
        }
        this.rating = rating;
    }
}
