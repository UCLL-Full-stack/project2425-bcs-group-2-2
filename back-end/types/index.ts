type PostInput = {
    id?: number;
    likes: number;
    description: string;
    uploadDate: Date;
    course: CourseInput;
};

type UserInput = {
    id?: number;
    username: string;
    password: string;
    age: number;
    email: string;
    bio: string;
    creationDate: Date;
    role: Role;
    posts: PostInput[];
    courses: CourseInput[];
};

type CourseInput = {
    id?: number;
    name: string;
    difficultyLevel: number;
    length: number;
    rating: number;
    description: string;
    materials: string[];
    instructions: string[];
    tips?: string;
    posts: PostInput[];
};

type AnonymousFeedbackInput = {
    id?: number;
    subject: string;
    body: string;
};

type Role = 'guest' | 'premium' | 'regular';

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export { Role, CourseInput, AuthenticationResponse, PostInput, UserInput, AnonymousFeedbackInput };
