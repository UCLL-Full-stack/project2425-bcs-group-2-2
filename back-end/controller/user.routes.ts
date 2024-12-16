import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '@prisma/client';

const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'  # Reference to the User schema
 *       500:
 *         description: Internal server error
 */

userRouter.get('/', async (req: Request , res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// userRouter.put('/:userId/courses/:courseId', async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const userId = parseInt(req.params.userId);
//         const courseId = parseInt(req.params.courseId);
//         userService.putUserCoursesById(userId, courseId);

//         res.status(200).json("the course was successfuly saved by the user");
//     }    catch (error) {
//         next(error);
//     }
// });


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.authenticate(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});




export {userRouter};


