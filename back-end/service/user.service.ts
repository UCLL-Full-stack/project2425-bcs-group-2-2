import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { UserSettings } from '../model/userSettings';
import courseDb from '../repository/course.db';

const createUser = ({
    id,
    name,
    age,
    password,
    email,
    bio,
}   
    :UserInput): User => {

    const currentDate = new Date();

    const defaultSettings = new UserSettings({theme:"default theme", notificationsEnabled:true, language:"english"});

    const user = new User({id, name, age, password, email, bio, creationDate:currentDate, userSettings:defaultSettings, posts:[], courses:[]
    })

    return userDb.createUser(user);
};



const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById =  (id: number): User => {
    const user = userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist`);
    return user;
};

const putUserCoursesById = (idUser: number, idCourse: number) : void => {
    const course = courseDb.getCourseById(idCourse);
    console.log(course)
    const user = getUserById(idUser);
    console.log(user)
    if(!course) throw new Error();
    user.setCourse(course);
    console.log(user)

}

export default { getAllUsers, getUserById, createUser, putUserCoursesById };
