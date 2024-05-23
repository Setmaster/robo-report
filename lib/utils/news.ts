import {MockData} from "@/assets/MockData";
import sql from "better-sqlite3";

const db = sql('data.db');

export async function getAllNews(){
    const news = db.prepare('SELECT * FROM news').all();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return news;
}


export function getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export async function getAvailableNewsYears() {
    const years = db
        .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
        .all()
        .map((year) => year.year);
    
    return years;
}



export function getAvailableNewsMonths(year: string): string[] {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const months = db.prepare("SELECT DISTINCT strftime('%m', date) AS month FROM news WHERE strftime('%Y', date) = ? ORDER BY month").all(year);
    return months.map(month => monthNames[parseInt(month.month, 10) - 1]);
}


export function getAvailableNewsMonthsNumber(year: string): number[] {
    const months = db.prepare("SELECT DISTINCT strftime('%m', date) AS month FROM news WHERE strftime('%Y', date) = ? ORDER BY month").all(year);
    return months.map(month => parseInt(month.month, 10));
}


export function getAvailableNewsMonthsTuple(year: string): [number, string][] {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const months = db.prepare("SELECT DISTINCT strftime('%m', date) AS month FROM news WHERE strftime('%Y', date) = ? ORDER BY month").all(year);
    return months.map(month => [parseInt(month.month), monthNames[parseInt(month.month) - 1]]);
}

export function getNewsByYear(year: string) {
    const news = db
        .prepare(
            "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
        )
        .all(year);
    
    return news;
}


export function getLatestNews() {
    return db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
}


export function getNewsByMonthAndYear(month: string, year: string) {
    return db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?").all(year, formatMonth(month));
}

function formatMonth(month: string) {
    return month.length === 1 ? `0${month}` : month;
}