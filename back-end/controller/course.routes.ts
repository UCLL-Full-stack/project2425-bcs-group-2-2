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
 *            description:
 *              type: string
 *              description: Course description.
 *            materials:
 *              type: array
 *              description: Materials needed.
 *            instructions:
 *              type: array
 *              description: Instructions for course.
 *            tips:
 *              type: string
 *              description: Extra tips.
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
 * /courses:
 *   delete:
 *     summary: Delete all courses.
 *     responses:
 *       200:
 *         description: All courses have been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All courses have been deleted successfully."
 *       500:
 *         description: Internal server error.
 */
courseRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await courseService.deleteAllCourses();
        res.status(200).json({ message: 'All courses have been deleted successfully.' });
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
 * /courses/details/{id}:
 *   get:
 *     summary: Get a course with its details by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the course to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A course with its details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *                 courseDetails:
 *                   $ref: '#/components/schemas/CourseDetails'
 *       404:
 *         description: Course or course details not found.
 *       500:
 *         description: Internal server error.
 */
courseRouter.get('/details', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log();
        const { id } = req.params;
        console.log(id);
        const courseId = Number(id);

        if (isNaN(courseId)) {
            return res.status(400).json({ error: 'Invalid course ID.' });
        }

        const course = await courseService.getCourseById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course or course details not found.' });
        }

        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course along with its details.
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
 *               description:
 *                 type: string
 *                 description: Description of the course details.
 *               materials:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Materials required for the course.
 *               instructions:
 *                  type: array
 *                  items:
 *                   type: string
 *                   description: Step-by-step instructions for the course.
 *               tips:
 *                  type: string
 *                  description: Additional tips for the course.
 *             required:
 *               - name
 *               - difficultyLevel
 *               - length
 *               - rating
 *               - description
 *               - materials
 *               - instructions
 *     responses:
 *       201:
 *         description: Successfully created a course and its details.
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
        const { name, difficultyLevel, length, rating, description, materials, instructions } =
            req.body;

        if (!description || typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description for course details.' });
        }
        if (!Array.isArray(materials) || materials.some((item) => typeof item !== 'string')) {
            return res.status(400).json({ error: 'Invalid materials for course details.' });
        }
        if (!Array.isArray(instructions) || instructions.some((item) => typeof item !== 'string')) {
            return res.status(400).json({ error: 'Invalid instructions for course details.' });
        }

        // Call service to create course and course details
        const newCourse = await courseService.createCourse({
            name,
            difficultyLevel,
            length,
            rating,
            description,
            materials,
            instructions,
            posts: [],
        });

        res.status(201).json(newCourse);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by its ID
 *     description: Deletes a course from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course to delete
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Course 1 deleted"
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
courseRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'Invalid course ID provided.' });
    }

    try {
        const courseId = Number(id);

        // Delete course from the database
        await courseService.deleteCourseByID(courseId);

        return res.status(200).json(`Course ${courseId} deleted`);
    } catch (error) {
        next(error); // Pass other errors to error handling middleware
    }
});

export { courseRouter };
