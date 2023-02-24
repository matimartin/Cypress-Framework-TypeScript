import { Expose } from "class-transformer";

export class CypressCourse {
    @Expose()
        title: string;
    @Expose()
        learnFeatures: string[];
    @Expose()
        lessons: string[];
}