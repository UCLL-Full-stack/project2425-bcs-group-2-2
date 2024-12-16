import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '@prisma/client';

const userRouter = express.Router();




userRouter.get('/all', async (req: Request , res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.get('/:username', async (req, res, next: NextFunction) => {
    try {
        const username = req.params.username; 
        const user = await userService.getUserByUsername(username)
        
        res.status(200).json(user);

    } catch (error) {
        next(error);

    };
});


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


