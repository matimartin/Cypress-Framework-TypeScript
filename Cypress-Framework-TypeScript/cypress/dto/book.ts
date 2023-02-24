import { Expose } from "class-transformer";

export class Book {
    @Expose()
    isbn: string;
    @Expose()
    title: string;
    @Expose()
    subTitle: string;
    @Expose()
    author: string;
    @Expose()
    publish_date: string;
    @Expose()
    publisher: string;
    @Expose()
    pages: number;
    @Expose()
    description: string;
    @Expose()
    website: string;
}

