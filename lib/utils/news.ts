import {MockData} from "@/assets/MockData";

export function getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export function getAvailableNewsYears(){
    // Using the reduce method on MockData to accumulate unique years
    return MockData.reduce((years, news) => {
        // Extracting the year from the news item's date
        const year = new Date(news.date).getFullYear();

        // If the year is not already included in the accumulator, add it
        if(!years.includes(year)){
            years.push(year);
        }

        // Return the updated list of years for the next iteration
        return years;
    }, [] as number[] /* Initial value for the years accumulator: an empty array of numbers */)
        .sort((a, b) => b - a); // Sorting the years in descending order before returning them
}

export function getAvailableNewsMonths(year: number): string[] {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return MockData.filter(news => new Date(news.date).getFullYear() === +year)
        .reduce((months, news) => {
            const month = new Date(news.date).getMonth();

            if (!months.includes(month)) {
                months.push(month);
            }

            return months;
        }, [] as number[])
        .sort((a, b) => a - b) // Ensure a numerical sort
        .map(monthIndex => monthNames[monthIndex]); // Convert month indices to month names
}

export function getAvailableNewsMonthsTuple(year: string): [number, string][] {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const numerical = MockData.filter(news => new Date(news.date).getFullYear() === +year)
        .reduce((months, news) => {
            const month = new Date(news.date).getMonth(); // getMonth() returns a 0-based index

            if (!months.includes(month)) {
                months.push(month);
            }

            return months;
        }, [] as number[])
        .sort((a, b) => a - b); // Ensure numerical sort

    // Create tuples of [monthNumber, monthName]
    return numerical.map(monthIndex => [monthIndex + 1, monthNames[monthIndex]]);
}

export function getNewsByYear(year: string){
    return MockData.filter(news => new Date(news.date).getFullYear() === +year);
}

export function getLatestNews(){
    return MockData.slice(0, 3);
}

export function getNewsByMonthAndYear(month: string, year: string){
    return MockData.filter(news => {
        const newsDate = new Date(news.date);
        return newsDate.getFullYear() === +year && newsDate.getMonth() === +month - 1;
    });
}