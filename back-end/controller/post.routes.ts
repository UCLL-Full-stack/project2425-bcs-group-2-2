import express, { Request, Response } from 'express';
// import postService from '../service/post.service';
import { PostInput } from '../types';

const postRouter = express.Router();


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'  # Reference to the Post schema
 *       500:
 *         description: Internal server error
 */

// postRouter.get('/', async (req: Request, res: Response) => {
//     try {
//         const posts = await postService.getAllPosts();
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
// postRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const postInput: PostInput = req.body;
//         const newPost = await postService.createPost(postInput);
//         res.status(200).json(newPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

export {postRouter};
