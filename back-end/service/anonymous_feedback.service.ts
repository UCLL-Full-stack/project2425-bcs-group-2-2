import anonymous_feedbackDb from '../repository/anonymous_feedback.db';
import { AnonymousFeedback } from '../model/anonymous_feedback';
import { AnonymousFeedbackInput } from '../types';


const createAnonymousFeedback = async ({
    subject,
    body
}: AnonymousFeedbackInput): Promise<AnonymousFeedback> => {

        const anonymousFeedback = new AnonymousFeedback({subject, body});
    return await anonymous_feedbackDb.createAnonymousFeedback(anonymousFeedback);
};

export default {createAnonymousFeedback};