'use client';
import {MockData} from "@/assets/MockData";
import {notFound, useRouter} from "next/navigation";
import Image from "next/image";
import classes from "./page.module.css";

type ImagePageProps = {
    params: {
        slug: string;
    };
};

export default function InterceptedImagePage({params}: ImagePageProps) {
    const router = useRouter();
    
    const newsSlug = params.slug;
    const newsArticle = MockData.find((article) => article.slug === newsSlug);

    if (!newsArticle) {
        notFound()
    }


    return (
        <>
            <div className={"modal-backdrop"} onClick={router.back}/>
            <dialog className={"modal"} open>
                <div className={classes.modalImageContainer}>
                    <Image layout={"responsive"} src={newsArticle.image} alt={newsArticle.title}/>
                </div>
            </dialog>
        </>
    );
}
