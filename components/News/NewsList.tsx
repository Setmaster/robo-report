import {MockData} from "@/assets/MockData";
import {getFormattedDate} from "@/lib/utils/news";
import {Card, Container, SimpleGrid, Text} from "@mantine/core";
import classes from "./NewList.module.css";
import Link from "next/link";
import Image from "next/image";
import {NewsItem} from "@/lib/types";

type NewsListProps = {
    news: NewsItem[];
};

export default function NewsList({news} : NewsListProps){
    const cards = news.map((article) => {
        const formattedDate = getFormattedDate(article.date);
        return (
            <Card
                className={classes.card}
                key={article.slug}
                p="md"
                radius="md"
                component={Link}
                href={`/news/${article.slug}`}
                target="_self"
            >
                <Image
                    className={classes.articleImage}
                    width={350}
                    height={350}
                    src={`/images/${article.image}`}
                    alt={article.title}
                />
                <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                    {formattedDate}
                </Text>
                <Text className={classes.title} mt={5}>
                    {article.title}
                </Text>
            </Card>
        );
    });

    return (
        <Container size={'responsive'} className={classes.container}>
            <SimpleGrid cols={{base: 1, sm: 2, md: 3, lg: 4, xl: 4}}>{cards}</SimpleGrid>
        </Container>
    );
}
