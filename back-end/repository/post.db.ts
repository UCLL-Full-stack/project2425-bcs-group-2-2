import { Post } from '../model/post';
import { PostInput } from '../types';

let currentPostId = 1;

const posts: Post[] = [];
const createPost = ({ likes, description, uploadDate }: PostInput): Post => {
    const post = new Post({
        likes,
        description,
        uploadDate,
    });
    posts.push(post);
    return post;
};

// const posts: Post[] = [
//     new Post({
//         id: currentPostId++,
//         likes: 120,
//         description: 'Exploring the beauty of nature on a weekend hike.',
//         uploadDate: new Date('2024-04-15'),
//     }),
//     new Post({
//         id: currentPostId++,
//         likes: 250,
//         description: 'Celebrating our graduation with friends and family!',
//         uploadDate: new Date('2024-06-20'),
//     }),
//     new Post({
//         id: currentPostId++,
//         likes: 75,
//         description: 'Trying out a new recipe today – homemade pasta!',
//         uploadDate: new Date('2024-07-05'),
//     }),
//     new Post({
//         id: currentPostId++,
//         likes: 340,
//         description: 'Sunset views from the top of the mountain.',
//         uploadDate: new Date('2024-08-10'),
//     }),
// ];

const getAllPosts = (): Post[] => posts;

const getPostById = (id: number): Post | undefined => posts.find((post) => post.getId() === id);

export default { getAllPosts, getPostById };
