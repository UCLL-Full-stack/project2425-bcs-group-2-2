import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { courseRouter } from './controller/course.routes';
import { postRouter } from './controller/post.routes';
import { userRouter } from './controller/user.routes';
import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ['self', 'https://api.ucll.be'],
        },
    })
);

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));

app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: `${process.env.JWT_SECRET}`,
        algorithms: ['HS256'],
    }).unless({
        path: ['/status', '/api-docs', '/users/signup', '/users/login', '/status'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

// app.use("/posts", postRouter);
<<<<<<< HEAD
app.use('/courses', courseRouter);
app.use('/users', userRouter);
// app.use("/settings", userSettingsRouter);
=======
// app.use("/courses", courseRouter);
app.use("/users", userRouter);
>>>>>>> user-page

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ status: 'application error', message: err.message });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
