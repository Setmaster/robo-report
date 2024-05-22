import {MockData} from "@/assets/MockData";
import {notFound} from "next/navigation";
import Image from "next/image";
import classes from "./page.module.css";

type ImagePageProps = {
    params: {
        slug: string;
    };
};

export default function ImagePage({params}:ImagePageProps){
    const newsSlug = params.slug;
    const newsArticle = MockData.find((article) => article.slug === newsSlug);

    if (!newsArticle) {
        notFound()
    }
    
    
    return (
        <div className={classes.imageContainer}>
            <Image layout={"responsive"} src={newsArticle.image} alt={newsArticle.title} />
        </div>
    );
}
