import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://customerapp.ime.co.ir'],
    sendAccessToken: true,
  }
};
