import { Course as CoursePrisma } from '@prisma/client';
import { isThisSecond } from 'date-fns';
export class Course {
    public id?: number;
    public name: string;
    public difficultyLevel: number;
    public length: number;
    public rating: number;
    public description: string;
    public materials: string[];
    public instructions: string[];
    public tips?: string;

    constructor(course: {
        id?: number;
        name: string;
        difficultyLevel: number;
        length: number;
        rating: number;
        description: string;
        materials: string[];
        instructions: string[];
        tips?: string;
    }) {
        this.id = course.id;
        this.name = course.name;
        this.difficultyLevel = course.difficultyLevel;
        this.length = course.length;
        this.rating = course.rating;
        this.description = course.description;
        this.materials = course.materials;
        this.instructions = course.instructions;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
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

    getDescription(): string | undefined {
        return this.description;
    }

    getMaterials(): string[] | undefined {
        return this.materials;
    }

    getInstructions(): string[] | undefined {
        return this.instructions;
    }

    getTips(): string | undefined {
        return this.tips;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setDifficultyLevel(difficultyLevel: number): void {
        // Accepts undefined
        if (difficultyLevel !== undefined && (difficultyLevel < 1 || difficultyLevel > 5)) {
            throw new Error('Difficulty level must be between 1 and 5.');
        }
        this.difficultyLevel = difficultyLevel;
    }

    setLength(length: number): void {
        // Accepts undefined
        if (length !== undefined && length < 0) {
            throw new Error('Length must be a positive number.');
        }
        this.length = length;
    }

    setRating(rating: number): void {
        // Accepts undefined
        if (rating !== undefined && (rating < 1 || rating > 10)) {
            throw new Error('Rating must be between 1 and 10.');
        }
        this.rating = rating;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setMaterials(materials: string[]): void {
        this.materials = materials;
    }

    setInstructions(instructions: string[]): void {
        this.instructions = instructions;
    }

    static from({
        id,
        name,
        difficultyLevel,
        length,
        rating,
        description,
        materials,
        instructions,
    }: CoursePrisma) {
        return new Course({
            id,
            name,
            difficultyLevel,
            length,
            rating,
            description,
            materials,
            instructions,
        });
    }
}
