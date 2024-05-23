'use client';

import { useEffect, useState } from "react";
import NewsList from "@/components/News/NewsList";

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [news, setNews] = useState();

    useEffect(() => {
        async function fetchNews(){
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/news');

            if (!response.ok){
                setError('Failed to fetch news');
                setIsLoading(false);
                return; // Make sure to return here so it doesn't try to process an error response as JSON
            }

            const newsData = await response.json(); 
            setIsLoading(false);
            setNews(newsData);
        }
        fetchNews();
    }, []);

    if (isLoading){
        return <div>Loading...</div>;
    }

    if (error){
        return <div>Error: {error}</div>;
    }
    
    if (news){
        return <NewsList news={news} />;
    }

    return <div>No news available.</div>;
}
