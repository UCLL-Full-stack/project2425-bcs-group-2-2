/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              description: User ID.
 *            username:
 *              type: string
 *              description: Unique username of the user.
 *            password:
 *              type: string
 *              description: Encrypted user password.
 *            email:
 *              type: string
 *              description: Email of the user.
 *            bio:
 *              type: string
 *              description: User's biography.
 *            age:
 *              type: number
 *              description: User's age.
 *            creationDate:
 *              type: string
 *              format: date-time
 *              description: Date when the user account was created.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '@prisma/client';

const userRouter = express.Router();

/**
 * @swagger
 * /users/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string } };
        const {username} = request.auth;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.delete('/', async (req: Request , res: Response, next: NextFunction) => {
    try {
    const request = req as Request & { auth: { username: string } };

    const {username} = request.auth;
        const user = await userService.deleteUserByUsername(username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

            res.status(200).json(user);
} catch (error) {
    next(error);  
}}
    


/**
 * @swagger
 * /users/{username}/{bio}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a user's bio by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user to update.
 *       - in: path
 *         name: bio
 *         required: true
 *         schema:
 *           type: string
 *         description: New bio for the user.
 *     responses:
 *       200:
 *         description: User bio updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.put('/', async (req: Request , res: Response, next: NextFunction) => {
    try {

    const request = req as Request & { auth: { username: string} };
    const {username} = request.auth;
    const bio = request.body.bio; 
    const user = await userService.updateUserByUsername(username, bio);
    res.status(200).json(user);
} catch (error) {
    next(error);
}})


userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user (login).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful, returns a JWT token.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.authenticate(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})