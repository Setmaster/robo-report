import Image from "next/image";
import styles from "./page.module.css";
import {getAvailableNewsMonths} from "@/lib/utils/news";

export default function Home() {
  const months = getAvailableNewsMonths(2024);
    console.log(months);
  return (
<main>
  <main>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </main>
</main>
  );
}
