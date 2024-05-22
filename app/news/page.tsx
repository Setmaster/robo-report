import {SimpleGrid, Card, Text, Container, AspectRatio} from '@mantine/core';
import classes from './page.module.css';
import {MockData} from "@/assets/MockData";
import Image from 'next/image';
import Link from "next/link";

export default function NewsPage() {
    const cards = MockData.map((article) => {

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
                    src={article.image}
                    alt={article.title}
                />
                <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                    {article.date}
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
