import userSettingsDb from '../repository/userSettings.db';
import { UserSettings } from '../model/userSettings';

const getUserSettingsFromDb = async (): Promise<UserSettings> =>
    userSettingsDb.getLocalUserSettings();

export default { getUserSettingsFromDb };
