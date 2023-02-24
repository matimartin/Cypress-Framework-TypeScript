

import { Expose } from "class-transformer";

export class IdTokenEntity {
    @Expose()
    credentialType: string;
    @Expose()
    homeAccountId: string;
    @Expose()
    environment: string;
    @Expose()
    clientId: string;
    @Expose()
    secret: string;
    @Expose()
    realm: string;

}
