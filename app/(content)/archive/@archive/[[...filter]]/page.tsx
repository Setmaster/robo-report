import NewsList from "@/components/News/NewsList";
import {
    getAvailableNewsMonthsNumber,
    getAvailableNewsMonthsTuple,
    getAvailableNewsYears,
    getNewsByMonthAndYear,
    getNewsByYear
} from "@/lib/utils/news";
import Link from "next/link";
import {type} from "node:os";

type FilteredNewsPageParams = {
    params: {
        year: string;
        filter?: string[];
    };
}
type LinkType = string | [number, string]| number;

export default async function FilteredNewsPage({params}: FilteredNewsPageParams) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];
    
    let news;
    let links:LinkType[] = await getAvailableNewsYears();
    
    if(selectedYear && !selectedMonth){
        news = getNewsByYear(selectedYear);
        links  = getAvailableNewsMonthsTuple(selectedYear);
    }
    
    if(selectedYear && selectedMonth){
        news = getNewsByMonthAndYear(selectedMonth, selectedYear);
        links= []
    }
    
    let newsContent = null
    
    if(news && news.length > 0){
        newsContent = <NewsList news={news}/>
    }
    
    const availableYears = await getAvailableNewsYears();
    const availableMonths = getAvailableNewsMonthsNumber(selectedYear as string);
    
    if (selectedYear && !availableYears.includes(selectedYear)){
        throw new Error('Invalid filter [Year]');
    }
    
    if (selectedMonth && !availableMonths.includes(+selectedMonth)){
        throw new Error('Invalid filter [Month]');
    }
    
    if (selectedYear && newsContent === null){
        newsContent = <p>No news found for the selected time period.</p>
    }
    
    const linksOutput = links.map(link => {
        if(selectedYear && Array.isArray(link)){
            const [monthNumber, monthName] = link;
            const href = `/archive/${selectedYear}/${monthNumber}`;
            return (
                <li key={monthNumber}>
                    <Link href={href}>{monthName}</Link>
                </li>  
            );
        }

        const href = `/archive/${link}`;
        return (
            <li key={String(link)}>
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
