export class Post {

    private id?: number;
    private likes: number;
    private description: string;
    private uploadDate: Date;

    constructor(post: {
        id?: number;
        likes: number;
        description: string;
        uploadDate: Date;

    }) 
    {
        this.id = post.id;
        this.likes = post.likes;
        this.description = post.description;
        this.uploadDate = post.uploadDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLikes(): number {
        return this.likes;
    }

    getDescription(): string {
        return this.description;
    }

    getUploadDate(): Date {
        return this.uploadDate;
    }

}