export class UserSetting {
  public static readonly utcLocale: UserSetting = new UserSetting('Etc/GMT', '(UTC+00:00) Coordinated Universal Time');
  public static readonly englishLocale: UserSetting = new UserSetting('Europe/London', '(UTC+00:00) Dublin, Edinburgh, Lisbon, London');
  public static readonly greekLocale: UserSetting = new UserSetting('Europe/Athens', '(UTC+02:00) Athens, Nicosia');
  public static readonly portugueseLocale: UserSetting = new UserSetting('America/Sao_Paulo', '(UTC-03:00) Brasilia');

  public static readonly englishLanguage: UserSetting = new UserSetting('en-gb', 'English (United Kingdom)');
  public static readonly greekLanguage: UserSetting = new UserSetting('el', 'Greek');
  public static readonly portugueseLanguage: UserSetting = new UserSetting('pt-br', 'Portuguese (Brazil)');

  public static readonly allAvailableLocales: UserSetting[] = [
    this.utcLocale,
    this.englishLocale,
    this.greekLocale,
    this.portugueseLocale
  ];

  public static readonly allAvailableLanguages: UserSetting[] = [
    this.englishLanguage,
    this.greekLanguage,
    this.portugueseLanguage
  ];

  private constructor(
    public readonly id: string,
    public readonly name: string) {
  }
}
