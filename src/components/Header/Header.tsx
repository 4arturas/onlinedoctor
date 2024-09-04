"use client";

import Link from "next/link";
import { Menu, Button } from "antd";
import { usePathname } from "next/navigation";
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from "@/app/[locale]/ThemeContext";
import styles from './Header.module.css';

const Header: React.FC = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        {
            label: <Link href="/">Home</Link>,
            key: "/",
        },
        {
            label: <Link href="/user-classifications">User Classifications</Link>,
            key: "/user-classifications",
        },
    ];

    return (
        <div className={styles.headerContainer}>
            <Menu mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
            <Button onClick={toggleTheme} icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}>
                {theme === 'light' ? 'Night' : 'Day'}
            </Button>
        </div>
    );
};

export default Header;