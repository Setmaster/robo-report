import NewsList from "@/components/News/NewsList";
import {getNewsByYear} from "@/lib/utils/news";

type FilteredNewsPageParams = {
    params: {
        year: string;
    };
}

export default function FilteredNewsPage({params}: FilteredNewsPageParams) {
    const newsYear = params.year;
    const news = getNewsByYear(newsYear);
    return (
        <>
            <NewsList news={news}/>
        </>
    );
}
