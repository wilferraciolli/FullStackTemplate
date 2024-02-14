import { MetaDataRules, MetaDataWithValues } from '../../shared/response/meta-data';


export interface UserSettingsResponse {
  _data: {
    userSetting: Array<{
      id: string;
      userId: number;
      settingUserType: string;
      settingCode: string;
      settingValue: string;
    }>
  };
  _metadata: {
    id: MetaDataRules,
    userId: MetaDataRules,
    settingCode: MetaDataWithValues,
    userSetting: MetaDataWithValues,
    settingValue: MetaDataRules
  };
  _metaLinks: {
    self: {
      href: string
    }
  };
}
