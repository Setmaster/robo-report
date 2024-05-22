import {Container, Group, Title, Text} from "@mantine/core";
import classes from './not-found.module.css';
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="error">
            <div className={classes.root}>
                <Container>
                    <div className={classes.label}>404</div>
                    <Title className={classes.title}>We couldn't find the article you were looking for.</Title>
                    <Text size="lg" ta="center" className={classes.description}>
                        You may have mistyped the article's address, or the article has been deleted.</Text>
                    <Group justify="center">
                        <div className={classes.button}>
                            <Link href="/">Take me home</Link>
                        </div>
                    </Group>
                </Container>
            </div>
        </main>
    );
}