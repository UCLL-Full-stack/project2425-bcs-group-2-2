export class Post {
    public id?: number; // Optional
    public likes?: number; // Optional
    public description?: string; // Optional
    public uploadDate?: Date; // Optional

    constructor(post: {
        id?: number; // Optional
        likes?: number; // Optional
        description?: string; // Optional
        uploadDate?: Date; // Optional
    }) {
        this.id = post.id;
        this.likes = post.likes;
        this.description = post.description;
        this.uploadDate = post.uploadDate;
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

    setDescription(description: string | undefined): void {
        // Accepts undefined
        this.description = description;
    }

    setUploadDate(uploadDate: Date | undefined): void {
        // Accepts undefined
        this.uploadDate = uploadDate;
    }
}
