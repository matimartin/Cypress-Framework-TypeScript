import { Expose } from "class-transformer";

export class CovidUIEntity{
    @Expose()
    state?: string;
    @Expose()
    confirmed?: string;
    @Expose()
    active?: string;
    @Expose()
    recovered?: string;
    @Expose()
    deceased?: string;
    @Expose()
    teste?: string;
}