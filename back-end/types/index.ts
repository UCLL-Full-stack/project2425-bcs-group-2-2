
type PostInput = {
    id?: number;
    likes: number;
    description: string;
    uploadDate: Date;
};

type UserInput = {
    id?: number;
    name: string;
    password: string;
    age: number;
    email: string;
    bio: string;
    creationDate: Date;
    userSettings:  UserSettingsInput;
    posts: PostInput[];
};

type CourseInput = {
    id?: number;
    name: string;
    creationDate: Date;
    difficultyLevel: number;
    length: number;
    rating: number;
};

type UserSettingsInput = {
    id?: number;
    theme: string;
    notificationsEnabled: boolean;
    language: string;
};

export { CourseInput, PostInput, UserInput, UserSettingsInput };
