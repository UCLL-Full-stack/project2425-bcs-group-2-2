
type PostInput = {
    id?: number;
    likes: number;
    description: string;
    uploadDate: Date;
    course: CourseInput
};

type UserInput = {
    id?: number;
    username: string;
    password: string;
    age: number;
    email: string;
    bio: string;
    creationDate: Date;
    userSettings:  UserSettingsInput;
    posts: PostInput[];
    courses: CourseInput[];
};

type CourseInput = {
    id?: number;
    name: string;
    difficultyLevel: number;
    length: number;
    rating: number;
    posts: PostInput[]
};

type UserSettingsInput = {
    id?: number;
    theme: string;
    notificationsEnabled: boolean;
    language: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
}

export { CourseInput, AuthenticationResponse, PostInput, UserInput, UserSettingsInput };
