'use client';
import { Burger, Center, Container, Group, Menu, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import roboReportLogo from '@/assets/logo.png';
import classes from './MainHeader.module.css';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ColorSchemeToggle from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import classNames from "classnames";

// Define the interface for links
interface LinkItem {
    link: string;
    label: string;
    links?: LinkItem[];
}

const links: LinkItem[] = [
    { link: '/news', label: 'News' },
];

export default function MainHeader() {
    const [opened, { toggle }] = useDisclosure(false);

    const path = usePathname();

    const router = useRouter();
    const navigateHome = () => router.push('/');

    const isActiveLink = (currentPath: string, link: string) => {
        const normalizePath = (path: string) => path.endsWith('/') ? path.slice(0, -1) : path;
        currentPath = normalizePath(currentPath);
        link = normalizePath(link);

        return currentPath === link;
    };

    const items = links.map((link: LinkItem) => {
        const menuItems = link.links?.map((item: LinkItem) => (
            <Menu.Item key={item.link}><Link href={item.link} className={classNames(classes.link, { [classes.subActive]: isActiveLink(path, item.link) })}>{item.label}</Link></Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <Link
                            href={link.link}
                            className={classNames(classes.link, { [classes.active]: isActiveLink(path, link.link) })}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5}/>
                            </Center>
                        </Link>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className={classNames(classes.link, { [classes.active]: isActiveLink(path, link.link) })}
            >
                {link.label}
            </Link>
        );
    });

    const processLinks = (links: LinkItem[]): LinkItem[] => {
        let processedLinks: LinkItem[] = [];
        links.forEach((link: LinkItem) => {
            processedLinks.push({ link: link.link, label: link.label });
            if (link.links) {
                link.links.forEach((subLink: LinkItem) => {
                    processedLinks.push({ link: subLink.link, label: subLink.label });
                });
            }
        });
        return processedLinks;
    };

    const dropdownItems = processLinks(links).map((item: LinkItem) => (
        <Menu.Item key={item.link}>
            <Link href={item.link} className={classNames(classes.link, { [classes.active]: isActiveLink(path, item.link) })}>
                {item.label}
            </Link>
        </Menu.Item>
    ));

    return (
        <header className={classes.header}>
            <Container size="md">
                <div className={classes.inner}>
                    <div className={classes.logoContainer}>
                    <Image width={56} height={56} style={{ cursor: "pointer" }} src={roboReportLogo.src} onClick={navigateHome} alt={"a white robot with blue eyes"}/>
                    <span className={classes.logoText}>Robo Report</span>
                    </div>
                        <Group gap={5} visibleFrom="sm">
                        {items}
                        <div className={classes.colorSchemeToggle}>
                        <ColorSchemeToggle/>
                        </div>
                    </Group>

                    <Menu shadow="md" width={200} opened={opened} onChange={toggle} withinPortal>
                        <Menu.Target>
                            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm"/>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Stack>
                                {dropdownItems}
                                <div className={classes.dropdownColorSchemeToggle}>
                                    <ColorSchemeToggle justify={'left'} />
                                </div>
                            </Stack>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </Container>
        </header>
    );
}
