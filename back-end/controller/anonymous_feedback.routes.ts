/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AnonymousFeedback:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the feedback.
 *            subject:
 *              type: string
 *              description: The subject of the feedback.
 *            body:
 *              type: string
 *              description: The body content of the feedback.
 */

import express, { NextFunction, Request, Response } from 'express';
import anonymous_feedbackService from '../service/anonymous_feedback.service';
import { AnonymousFeedbackInput } from '../types';

const anonymous_feedbackRouter = express.Router();

/**
 * @swagger
 * /anonymous-feedback:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Submit anonymous feedback.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnonymousFeedback'
 *     responses:
 *       200:
 *         description: Feedback submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnonymousFeedback'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
anonymous_feedbackRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const anonymousFeedback = <AnonymousFeedbackInput>req.body;
        const result = await anonymous_feedbackService.createAnonymousFeedback(anonymousFeedback);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { anonymous_feedbackRouter };
