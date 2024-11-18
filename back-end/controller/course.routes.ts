import express, { Request, Response } from 'express';
// import courseService from '../service/course.service';
import { CourseInput } from '../types';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'  # Reference to the Course schema
 *       500:
 *         description: Internal server error
 */
// courseRouter.get('/', async (req: Request, res: Response) => {
//     try {
//         const courses = await courseService.getAllCourses();
//         res.status(200).json(courses);
//     } catch (error) {
//         console.error('Error fetching courses:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: The created course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
// courseRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const courseInput: CourseInput = req.body;
//         const newCourse = await courseService.createCourse(courseInput);
//         res.status(200).json(newCourse);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

export {courseRouter};
