import express, { Request, Response } from 'express';
import postService from '../service/post.service';
import { PostInput } from '../types';

const postRouter = express.Router();
postRouter.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

postRouter.post('/', async (req: Request, res: Response) => {
    try {
        const postInput: PostInput = req.body;
        const newPost = await postService.createPost(postInput);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export {postRouter};
