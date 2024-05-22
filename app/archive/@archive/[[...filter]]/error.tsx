'use client';

import {Container, Group, Title, Text} from "@mantine/core";
import classes from './error.module.css';
import Link from "next/link";

type ErrorProps = {
    error: {
        message: string;
    }
}

export default function Error({error}: ErrorProps) {
    return (
        <main className="error">
            <div className={classes.root}>
                <Container>
                    <div className={classes.label}>ERROR</div>
                    <Title className={classes.title}>Something bad just happened...</Title>
                    <Text size="lg" ta="center" className={classes.description}>
                        {error.message}
                    </Text>
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