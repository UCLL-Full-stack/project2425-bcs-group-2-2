import { User } from '../model/user';
import { UserInput } from '../types';

let currentUserId = 1;

const users: User[] = [];

const createUser = ({ name, age, email, bio }: UserInput): User => {
    const user = new User({
        name,
        age,
        email,
        bio,
    });
    users.push(user);
    return user;
};

const getAllUsers = (): User[] => users;

const getUserById = (id: number): User | undefined => users.find((user) => user.getId() === id);

export default { createUser, getAllUsers, getUserById };

// new User({
//     id: currentUserId++,
//     name: 'Alice Johnson',
//     age: 28,
//     email: 'alice.johnson@example.com',
//     bio: 'A passionate traveler and foodie. Always looking for new experiences!',
//     creationDate: new Date('2023-03-12'),
// }),
// new User({
//     id: currentUserId++,
//     name: 'Bob Smith',
//     age: 34,
//     email: 'bob.smith@example.com',
//     bio: 'Tech enthusiast and avid reader. I love coding and coffee.',
//     creationDate: new Date('2023-05-25'),
// }),
// new User({
//     id: currentUserId++,
//     name: 'Clara Lee',
//     age: 22,
//     email: 'clara.lee@example.com',
//     bio: 'Photography lover and nature explorer. Capturing moments one shot at a time.',
//     creationDate: new Date('2023-08-17'),
// }),
// new User({
//     id: currentUserId++,
//     name: 'David Martinez',
//     age: 30,
//     email: 'david.martinez@example.com',
//     bio: 'Fitness enthusiast and dog dad. Living life one workout at a time.',
//     creationDate: new Date('2023-10-03'),
// }),
// ];
