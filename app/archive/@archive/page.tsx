import {getAvailableNewsYears} from "@/lib/utils/news";
import Link from "next/link";

export default function NewsArchivePage() {
    const links = getAvailableNewsYears().map(year => (
        <li key={year}>
            <Link href={`/archive/${year}`}>{year}</Link>
        </li>
    ));
    return (
        <header id={"archive-header"}>
            <nav>
                <ul>
                    {links}
                </ul>
            </nav>
        </header>);
}
