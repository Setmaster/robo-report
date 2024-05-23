import NewsList from "@/components/News/NewsList";
import {getAllNews} from "@/lib/utils/news";

export default async function NewsPage() {

    const news = getAllNews();

    return <NewsList news={news}/>;
}
