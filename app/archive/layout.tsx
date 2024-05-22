import classes from './layout.module.css';
import React from "react";

type ArchiveLayoutProps = {
    archive: React.ReactNode;
    latest: React.ReactNode;
}

export default function ArchiveLayout({archive, latest}: ArchiveLayoutProps) {
    return (
        <div className={classes.archiveContainer}>
            <h1>News Archive</h1>
            <section id={"archive-filter"}>
                {archive}
            </section>
            <section id={"archive-latest"}>
                {latest}
            </section>
        </div>
    );
}