import Image from "next/image";
import styles from "./page.module.css";
import {getAvailableNewsMonths} from "@/lib/utils/news";
import logo from "@/assets/logo.png";
import Link from "next/link";

export default function Home() {

  return (
      <div id="home">
        <img src={logo.src} alt="Robo Reporter logo" />
        <h1>Robo Reporter: Your Source for Robot News</h1>
        <p>
          Robo Reporter is your dedicated platform for all news related to robots, drones, and cutting-edge machinery!
        </p>

        <p>
          At Robo Reporter, we aim to bring you the latest developments, innovations, and stories in the world of robotics and drones. From industrial machines to consumer gadgets, we cover it all in a concise and engaging manner.
        </p>

        <p>
          Our team of specialized journalists is passionate about technology and committed to providing insights, analysis, and updates on the rapidly evolving landscape of robots and drones. We strive to keep you informed with accurate and timely news.
        </p>

        <p>
          <Link href="/news">Discover the latest in robotics</Link>
        </p>
      </div>
  );
}
