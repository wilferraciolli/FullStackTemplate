export class UserSettings {
  userLanguage: string;
  userLocale: string;

  constructor(userLanguage: string, userLocale: string) {
    this.userLanguage = userLanguage;
    this.userLocale = userLocale;
  }
}
