export type Post = {
    id?: number;
    likes: number;
    description: string;
    uploadDate: Date;
    course: Course
};

export type User = {
    id?: number;
    username: string;
    password: string;
    age?: number;
    email?: string;
    bio?: string;
    creationDate?: Date;
    posts?: Post[];
    courses?: Course[];
};

export type Course = {
    id?: number;
    name: string;
    difficultyLevel: number;
    length: number;
    rating: number;
    description: string;
    materials: string;
    instructions: string;
    tips: string;
    users: User[]
};





export type StatusMessage = {
    message: string;
    type: "error" | "success";
};



