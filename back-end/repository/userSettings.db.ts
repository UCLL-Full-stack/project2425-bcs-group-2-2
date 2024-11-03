import { UserSettings } from '../model/userSettings';

let currentSettingsId = 1;

const userSettings = new UserSettings({
    id: currentSettingsId++,
    theme: 'dark',
    notificationsEnabled: true,
    language: 'English',
});

const getLocalUserSettings = (): UserSettings => userSettings;

export default { getLocalUserSettings };
