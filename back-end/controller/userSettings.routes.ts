import express, { Request, Response } from 'express';
import userSettingsService from '../service/userSettings.service';

const userSettingsRouter = express.Router();


/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all settings
 *     responses:
 *       200:
 *         description: A list of settings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSettings'  # Reference to the UserSettings schema
 *       500:
 *         description: Internal server error
 */

userSettingsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userSettingss = await userSettingsService.getUserSettingsFromDb();
        res.status(200).json(userSettingss);
    } catch (error) {
        console.error('Error fetching userSettings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {userSettingsRouter};
