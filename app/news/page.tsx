import {SimpleGrid, Card, Text, Container, AspectRatio} from '@mantine/core';
import classes from './page.module.css';
import {MockData} from "@/assets/MockData";
import Image from 'next/image';
import Link from "next/link";
import {getFormattedDate} from "@/lib/utils/news";
import NewsList from "@/components/News/NewsList";

export default function NewsPage() {
return (
    <NewsList news={MockData} />
);
}
