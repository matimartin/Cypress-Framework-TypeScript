
import { decode } from "jsonwebtoken";
import authSettings from "./authsettings.json";
import { AccountEntity } from "@dto/accountEntity";
import { AccessTokenEntity } from "@dto/accessTokenEntity";
import { IdTokenEntity } from "@dto/idTokenEntity";
import { RefreshTokenEntity } from "@dto/refreshTokenEntity";

const {
  authority,
  clientId,
  clientSecret,
  apiScopes,
  username,
  password,
} = authSettings;

const environment = "login.windows.net";

const injectTokens = (tokenResponse) => {
  const idToken = decode(tokenResponse.id_token);
  const localAccountId = idToken.oid || idToken.sid;
  const realm = idToken.tid;
  const homeAccountId = `${localAccountId}.${realm}`;
  const username = idToken.preferred_username;
  const name = idToken.name;

  const accountKey = `${homeAccountId}-${environment}-${realm}`;

  const accountEntity:AccountEntity = {
    authorityType: 'MSSTS',
    clientInfo: '',
    homeAccountId: homeAccountId,
    environment: environment,
    realm: realm,
    localAccountId: localAccountId,
    username: username,
    name: name,
    idTokenClaims: idToken,
  }

  const idTokenKey = `${homeAccountId}-${environment}-idtoken-${clientId}-${realm}-`;

  const idTokenEntity:IdTokenEntity = {
    credentialType: 'IdToken',
    homeAccountId: homeAccountId,
    environment: environment,
    clientId: clientId,
    secret: idToken,
    realm: realm,
  }

  const accessTokenKey = `${homeAccountId}-${environment}-accesstoken-${clientId}-${realm}-${apiScopes.join(
    " "
  )}`;

  const accessTokenEntity :AccessTokenEntity= {
    homeAccountId: homeAccountId,
    credentialType: 'AccessToken',
    secret: tokenResponse.access_token,
    cachedAt: Math.floor(Date.now()/1000).toString(),
    expiresOn: Math.floor(Date.now()/1000+tokenResponse.expires_in).toString(),
    extendedExpiresOn: Math.floor(Date.now()/1000+tokenResponse.ext_expires_in).toString(),
    environment: environment,
    clientId: clientId,
    realm: realm,
    target: apiScopes.map((s:string)=>s.toLowerCase()).join(' '),
  }

  const refreshTokenKey = `${homeAccountId}-${environment}-refreshtoken-${clientId}`;

  const refreshTokenEntity:RefreshTokenEntity={
    clientId: clientId,
    credentialType: 'RefreshToken',
    enviornment: environment,
    homeAccountId: homeAccountId,
    secret: tokenResponse.refresh_token,
  }
  localStorage.setItem(accountKey, JSON.stringify(accountEntity));
  localStorage.setItem(idTokenKey, JSON.stringify(idTokenEntity));
  localStorage.setItem(accessTokenKey, JSON.stringify(accessTokenEntity));
  localStorage.setItem(refreshTokenKey, JSON.stringify(refreshTokenEntity));
  localStorage.setItem('id.token', tokenResponse.id_token);
};

export const login = (cachedTokenResponse:any,appUrl:string,chainable:Cypress.Chainable) => {
  let tokenResponse = null;
  if (!cachedTokenResponse) {
    chainable = chainable.request({
      url: authority + "/oauth2/v2.0/token",
      method: "POST",
      body: {
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'openid profile offline_access',
        username: username,
        password: password,
      },
      form: true,
    });
  } else {
    chainable = chainable.then(() => {
      return {
        body: cachedTokenResponse,
      };
    });
  }

  chainable =  chainable.then((response) => {
     tokenResponse= response.body;
     cy.visit(`${appUrl}`,{
       onBeforeLoad(win){
        injectTokens(response.body);
       }
     });
    })
    .then(() => {
      return tokenResponse;
    });

  return chainable;
};
