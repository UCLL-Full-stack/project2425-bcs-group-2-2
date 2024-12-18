import {
    AnonymousFeedback as AnonymousFeedbackPrisma
} from '@prisma/client';

export class AnonymousFeedback {
    public id?: number;
    public subject: string;
    public body: string;
 

    constructor(anonymous_feedback: {
        id?: number;
        subject: string;
        body: string;
    }) {
        this.id = anonymous_feedback.id;
        this.subject = anonymous_feedback.subject;
        this.body = anonymous_feedback.body;
    }

    getId(): number | undefined {
        return this.id;
    }




    // Setters
    setId(id: number): void {
        this.id = id;
    }






    static from({
        id,
        subject,
        body
    }: AnonymousFeedbackPrisma) {
        return new AnonymousFeedback({
            id,
            subject,
            body
        })
    }
}
