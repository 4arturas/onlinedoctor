"use client";

import Link from "next/link";
import { Menu, Button } from "antd";
import { usePathname } from "next/navigation";
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import {useTheme} from "@/app/[locale]/ThemeContext";

const Navigation: React.FC = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const items = [
        {
            label: <Link href="/">Home</Link>,
            key: "/",
        },
        {
            label: <Link href="/user-classifications">User Classifications</Link>,
            key: "/user-classifications",
        },
        {
            key: "theme-toggle",
            label: (
                <Button onClick={toggleTheme} icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}>
                    {theme === 'light' ? 'Night' : 'Day'}
                </Button>
            ),
        },
    ];

    return (<div>
            {theme}
        <Menu mode="horizontal" selectedKeys={[pathname]} items={items} />
        </div>
    );
};

export default Navigation;