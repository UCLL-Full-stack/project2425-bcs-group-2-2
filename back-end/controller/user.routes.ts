import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {userRouter};
