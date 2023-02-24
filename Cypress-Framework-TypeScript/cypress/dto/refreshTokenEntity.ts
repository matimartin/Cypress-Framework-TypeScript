
import { Expose } from "class-transformer";

export class RefreshTokenEntity {
    @Expose()
    clientId: string;
    @Expose()
    credentialType: string;
    @Expose()
    enviornment: string;
    @Expose()
    homeAccountId: string;
    @Expose()
    secret: string;
}
