import {MockData} from "@/assets/MockData";
import NewsList from "@/components/News/NewsList";

export default function NewsPage() {
return (
    <NewsList news={MockData} />
);
}
