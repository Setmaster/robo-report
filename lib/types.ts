import {StaticImageData} from "next/image";

export type NewsItem = {
    title: string;
    slug: string;
    date: string;
    image: StaticImageData;
    content: string;
};