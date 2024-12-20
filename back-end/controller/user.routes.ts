import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '@prisma/client';

const userRouter = express.Router();

userRouter.get('/', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string } };
        const {username} = request.auth;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);

    } catch (error) {
        next(error);

    };
});

userRouter.delete('/', async (req: Request , res: Response, next: NextFunction) => {
try {
    const request = req as Request & { auth: { username: string } };

    const {username} = request.auth;
    const user = await userService.deleteUserByUsername(username);
        res.status(200).json(user);
} catch (error) {
    next(error);

    
}
})

userRouter.put('/', async (req: Request , res: Response, next: NextFunction) => {
try {

    const request = req as Request & { auth: { username: string} };
    const {username} = request.auth;
    const bio = request.body.bio; 

        const user = await userService.updateUserByUsername(username, bio);
        res.status(200).json(user);
} catch (error) {
    next(error);

}
})


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


