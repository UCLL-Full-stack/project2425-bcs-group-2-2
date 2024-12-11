/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Course name.
 *            difficultyLevel:
 *              type: number
 *              description: Course difficulty.
 *            length:
 *              type: number
 *              description: Course duration.
 *            rating:
 *              type: number
 *              description: Course rating.
 *            users:
 *              type: array
 *              description: Users enrolled.
 *            posts:
 *              type: array
 *              description: Course posts.
 */

import express, { NextFunction, Request, Response } from 'express';
import courseService from '../service/course.service';
import { CourseInput } from '../types';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get a list of all courses.
 *     responses:
 *       200:
 *         description: A list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Course'
 */
courseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the course to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A course object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
courseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        const idNumber = Number(id);

        if (!id) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        const course = await courseService.getCourseById(idNumber); // Assuming courseService has a getCourseByID method

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{rating}:
 *   get:
 *     summary: Get courses by rating greater than.
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         description: Numeric ID of the course to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A course object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
courseRouter.get('/:rating', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rating } = req.params;

        const ratingNumber = Number(rating);

        // Validate that rating is a valid number
        if (isNaN(ratingNumber)) {
            return res.status(400).json({ error: 'Invalid rating parameter. Must be a number.' });
        }

        const courses = await courseService.getCoursesWithRatingGreaterThan(ratingNumber);

        if (courses.length === 0) {
            return res.status(404).json({ error: 'No courses found with the specified rating.' });
        }

        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{level}:
 *   get:
 *     summary: Get courses by difficulty level.
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         description: Numeric ID of the course to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A course object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid difficulty rating
 *       404:
 *         description: Courses not found
 *       500:
 *         description: Internal server error
 */
courseRouter.get('/:level', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { level } = req.params;

        const levelNumber = Number(level);

        // Validate that rating is a valid number
        if (isNaN(levelNumber)) {
            return res.status(400).json({ error: 'Invalid rating parameter. Must be a number.' });
        }

        const courses = await courseService.getCoursesWithRatingGreaterThan(levelNumber);

        if (courses.length === 0) {
            return res
                .status(404)
                .json({ error: 'No courses found with the specified difficulty.' });
        }

        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course.
 *               difficultyLevel:
 *                 type: integer
 *                 description: Difficulty level (1-5).
 *               length:
 *                 type: number
 *                 description: Length of the course in hours.
 *               rating:
 *                 type: number
 *                 description: Rating of the course (1-10).
 *             required:
 *               - name
 *               - difficultyLevel
 *               - length
 *               - rating
 *     responses:
 *       201:
 *         description: Successfully created a course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
courseRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, difficultyLevel, length, rating } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid course name.' });
        }
        if (
            !difficultyLevel ||
            typeof difficultyLevel !== 'number' ||
            difficultyLevel < 1 ||
            difficultyLevel > 5
        ) {
            return res
                .status(400)
                .json({ error: 'Invalid difficulty level. Must be a number between 1 and 5.' });
        }
        if (!length || typeof length !== 'number' || length <= 0) {
            return res.status(400).json({ error: 'Invalid length. Must be a positive number.' });
        }
        if (!rating || typeof rating !== 'number' || rating < 1 || rating > 10) {
            return res
                .status(400)
                .json({ error: 'Invalid rating. Must be a number between 1 and 10.' });
        }

        const newCourse = await courseService.createCourse({
            name,
            difficultyLevel,
            length,
            rating,
            posts: [],
        });

        res.status(201).json(newCourse);
    } catch (error) {
        next(error);
    }
});

export { courseRouter };
