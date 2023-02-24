

import { Expose } from "class-transformer";

export class AccessTokenEntity {
    @Expose()
    homeAccountId: string;
    @Expose()
    credentialType: string;
    @Expose()
    secret: string;
    @Expose()
    cachedAt: string;
    @Expose()
    expiresOn: string;
    @Expose()
    extendedExpiresOn: string;
    @Expose()
    environment: string;
    @Expose()
    clientId: string;
    @Expose()
    realm: string;
    @Expose()
    target: string;

}
