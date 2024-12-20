import express, { NextFunction, Request, Response } from 'express';
import anonymous_feedbackService from '../service/anonymous_feedback.service';
import { AnonymousFeedbackInput } from '../types';

const anonymous_feedbackRouter = express.Router();


anonymous_feedbackRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const anonymousFeedback = <AnonymousFeedbackInput>req.body;
        const result = await anonymous_feedbackService.createAnonymousFeedback(anonymousFeedback);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


export {anonymous_feedbackRouter};