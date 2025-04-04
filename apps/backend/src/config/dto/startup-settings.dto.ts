import {IStartupSettings} from '@heimdall/common/interfaces';

export class StartupSettingsDto implements IStartupSettings {
  readonly apiKeysEnabled: boolean;
  readonly banner: string;
  readonly classificationBannerColor: string;
  readonly classificationBannerText: string;
  readonly classificationBannerTextColor: string;
  readonly enabledOAuth: string[];
  readonly oidcName: string;
  readonly ldap: boolean;
  readonly registrationEnabled: boolean;
  readonly localLoginEnabled: boolean;
  readonly tenableHostUrl: string;
  readonly splunkHostUrl: string;

  constructor(settings: IStartupSettings) {
    this.apiKeysEnabled = settings.apiKeysEnabled;
    this.banner = settings.banner;
    this.classificationBannerColor = settings.classificationBannerColor;
    this.classificationBannerText = settings.classificationBannerText;
    this.classificationBannerTextColor = settings.classificationBannerTextColor;
    this.enabledOAuth = settings.enabledOAuth;
    this.oidcName = settings.oidcName;
    this.ldap = settings.ldap;
    this.registrationEnabled = settings.registrationEnabled;
    this.localLoginEnabled = settings.localLoginEnabled;
    this.tenableHostUrl = settings.tenableHostUrl;
    this.splunkHostUrl = settings.splunkHostUrl;
  }
}
