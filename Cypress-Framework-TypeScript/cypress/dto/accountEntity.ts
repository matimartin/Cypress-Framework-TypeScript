

import { Expose } from "class-transformer";

export class AccountEntity {
    @Expose()
    authorityType: string;
    @Expose()
    clientInfo: string;
    @Expose()
    homeAccountId: string;
    @Expose()
    environment: string;
    @Expose()
    realm: string;
    @Expose()
    localAccountId: string;
    @Expose()
    username: string;
    @Expose()
    name: string;
    @Expose()
    idTokenClaims: string;

}