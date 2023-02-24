

import { Expose } from "class-transformer";

export class ExcelInputDataEntity {
    @Expose()
    TenantName: string;
    @Expose()
    TenantCode: string;
    @Expose()
    OrgName: string;
    @Expose()
    SupportNumber: string;
}