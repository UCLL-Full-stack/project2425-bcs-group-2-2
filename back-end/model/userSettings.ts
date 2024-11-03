export class UserSettings {
    public id?: number;
    public theme: string;
    public notificationsEnabled: boolean;
    public language: string;

    constructor(settings: {
        id?: number;
        theme: string;
        notificationsEnabled: boolean;
        language: string;
    }) {
        this.id = settings.id;
        this.theme = settings.theme;
        this.notificationsEnabled = settings.notificationsEnabled;
        this.language = settings.language;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTheme(): string {
        return this.theme;
    }

    setTheme(theme: string): void {
        this.theme = theme;
    }

    getNotificationsEnabled(): boolean {
        return this.notificationsEnabled;
    }

    setNotificationsEnabled(enabled: boolean): void {
        this.notificationsEnabled = enabled;
    }

    getLanguage(): string {
        return this.language;
    }

    setLanguage(language: string): void {
        this.language = language;
    }
}
