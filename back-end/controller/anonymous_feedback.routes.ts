import express, { Request, Response } from 'express';
import anonymous_feedbackService from '../service/anonymous_feedback.service';
import { AnonymousFeedbackInput } from '../types';

const anonymous_feedbackRouter = express.Router();

export {anonymous_feedbackRouter};
