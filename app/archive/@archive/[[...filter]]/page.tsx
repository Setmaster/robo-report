import NewsList from "@/components/News/NewsList";
import {
    getAvailableNewsMonths,
    getAvailableNewsMonthsTuple,
    getAvailableNewsYears, getNewsByMonthAndYear,
    getNewsByYear
} from "@/lib/utils/news";
import Link from "next/link";

type FilteredNewsPageParams = {
    params: {
        year: string;
    };
}

export default function FilteredNewsPage({params}: FilteredNewsPageParams) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];
    
    let news;
    let links = getAvailableNewsYears();
    
    if(selectedYear && !selectedMonth){
        news = getNewsByYear(selectedYear);
        links = getAvailableNewsMonthsTuple(selectedYear);
    }
    
    if(selectedYear && selectedMonth){
        news = getNewsByMonthAndYear(selectedMonth, selectedYear);
        links= []
    }
    
    let newsContent = null
    
    if(news && news.length > 0){
        newsContent = <NewsList news={news}/>
    }
    if (selectedYear && newsContent === null){
        newsContent = <p>No news found for the selected time period.</p>
    }
    
    const linksOutput = links.map(link => {
        if(selectedYear){
            const href = `/archive/${selectedYear}/${link[0]}`;
            return (
                <li key={link[0]}>
                    <Link href={href}>{link[1]}</Link>
                </li>  
            );
        }

        const href = `/archive/${link}`;
        return (
            <li key={link}>
                <Link href={href}>{link}</Link>
            </li>
        );
    });
    
    return (
        <>
            <header id={"archive-header"}>
                <nav>
                    <ul>
                        {linksOutput}
                    </ul>
                </nav>
            </header>

            {newsContent}
        </>
    );
}
