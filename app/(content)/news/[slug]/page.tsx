import {MockData} from "@/assets/MockData";
import Image from "next/image";
import classes from "./page.module.css";
import {notFound} from "next/navigation";
import {getFormattedDate} from "@/lib/utils/news";
import Link from "next/link";

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

    const formattedDate = getFormattedDate(newsArticle.date);

    return (
        <article className={classes.article}>
            <header>
                <h1>{newsArticle.title}</h1>
                <time dateTime={formattedDate}>{formattedDate}</time>
                <div className={classes.imageContainer}>
                    <Link href={`/news/${newsArticle.slug}/image`}>
                        <Image layout={"responsive"} src={newsArticle.image} alt={newsArticle.title} />
                    </Link>
                </div>
            </header>
            <p className={classes.content}>{newsArticle.content}</p>
        </article>
    );
}
