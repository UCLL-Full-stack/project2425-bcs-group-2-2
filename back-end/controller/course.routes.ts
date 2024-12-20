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
 *   security:
 *     - bearerAuth: []
 *   get:
 *     summary: Get a list of all courses.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Course'
 *       401:
 *         description: Unauthorized. Invalid or missing bearer token.
 *       500:
 *         description: Internal server error.
 */
courseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: string } };
        const { role } = request.auth;
        const courses = await courseService.getAllCourses(role);
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   security:
 *     - bearerAuth: []
 *   get:
 *     summary: Get a course by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the course to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A course object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID.
 *       404:
 *         description: Course not found.
 *       401:
 *         description: Unauthorized. Invalid or missing bearer token.
 *       500:
 *         description: Internal server error.
 */
courseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string } };
        const id = request.params.id;
        const idNumber = Number(id);
        const course = await courseService.getCourseById(idNumber);
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});

export { courseRouter };
