import { AnonymousFeedback } from '../model/anonymous_feedback';
import { AnonymousFeedbackInput } from '../types';
import {Prisma, PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();


const createAnonymousFeedback = async ({subject, body}: AnonymousFeedback): Promise<AnonymousFeedback> => {
    try {
        const newAnonymousFeedback = await prisma.anonymousFeedback.create({
            data: {
                subject,
                body,
            },
            
        });
    
        return AnonymousFeedback.from(newAnonymousFeedback);
    } catch (error) {
        throw new Error("Database error")
    }
};

export default {createAnonymousFeedback};