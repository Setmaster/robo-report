import {MockData} from "@/assets/MockData";
import Image from "next/image";
import classes from "./page.module.css";
import {notFound} from "next/navigation";

type DetailsPageProps = {
    params: {
        slug: string;
    };
};

export default function NewsDetailsPage({params}: DetailsPageProps){
    const newsSlug = params.slug;
    const newsArticle = MockData.find((article) => article.slug === newsSlug);
    
    if (!newsArticle) {
        notFound()
    }
    
    return (
        <article className={classes.article}>
            <header>
                <h1>{newsArticle.title}</h1>
                <time dateTime={newsArticle.date}>{newsArticle.date}</time>
                <div className={classes.imageContainer}>
                <Image layout={"responsive"} src={newsArticle.image} alt={newsArticle.title} />
                </div>
            </header>
            <p className={classes.content}>{newsArticle.content}</p>
        </article>
    );
}
