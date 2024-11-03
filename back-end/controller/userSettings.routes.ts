import express, { Request, Response } from 'express';
import userSettingsService from '../service/userSettings.service';

const userSettingsRouter = express.Router();
userSettingsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userSettingss = await userSettingsService.getUserSettingsFromDb();
        res.status(200).json(userSettingss);
    } catch (error) {
        console.error('Error fetching userSettings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default userSettingsRouter;
