import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { UserSettings } from '../model/userSettings';

const createUser = ({
    name,
    password,
    age,
    email,
    bio
}: UserInput): Promise<User> => {
    const creationDate = new Date();
    const user = new User({name, password, age, email, bio, creationDate});
    return userDb.createUser(user);
};




const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = (id: number): Promise<User | null> => {
    const user = userDb.getUserById(id);
    return user;
};

// const putUserCoursesById = (idUser: number, idCourse: number) : void => {
//     const course = courseDb.getCourseById(idCourse);
//     console.log(course)
//     const user = getUserById(idUser);
//     console.log(user)
//     if(!course) throw new Error();
//     user.setCourse(course);
//     console.log(user)

// }

// export default { getAllUsers, getUserById, createUser, putUserCoursesById };
export default { getAllUsers, getUserById, createUser };

