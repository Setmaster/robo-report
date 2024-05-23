import NewsList from "@/components/News/NewsList";
import {getAllNews} from "@/lib/utils/news";

export default async function NewsPage() {

    const news = await getAllNews();

    return <NewsList news={news}/>;
}
