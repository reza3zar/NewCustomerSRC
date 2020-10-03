import { AuthConfig } from 'angular-oauth2-oidc';
export const authConfig: AuthConfig = {
  issuer: "https://sso.ime.co.ir",
  clientId: "IME.CustomerManagement.UI", // The "Auth Code + PKCE" client
  responseType: 'code',
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin+"/silent-refresh.html",
  scope: 'openid profile email phone address roles tenants ime.customermanagement.webapi.broker.public  ime.customermanagement.webapi.common.public ime.customermanagement.webapi.exchange.public ime.customermanagement.webapi.servicehub.public ime.customermanagement.webapi.serviceinjection.public ime.customermanagement.webapi.componentmodel.public ime.customermanagement.webapi.documents.public ime.customermanagement.webapi.reports.public', // Ask offline_access to support refresh token refreshes
  // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
   
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  // nonceStateSeparator : 'semicolon' // Real semicolon gets mangled by IdentityServer's URI encoding
  requireHttps:true,
   oidc:true,
   dummyClientSecret:"{H`Q25_${!J}.V`)y?B%(JNPB>G#4P;5Zs'-yu7,g]",
};
