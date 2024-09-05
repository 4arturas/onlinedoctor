'use client';

import { Menu, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/app/[locale]/ThemeContext';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './Header.module.css';

const LocaleSwitcher: React.FC = () => {
    const t = useTranslations('Header.LocaleSwitcher');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'de' : 'en';
    const pathname = usePathname();
    const flag = otherLocale === 'en' ? '🇬🇧' : '🇩🇪';
    const tooltipText = t('switchLocale', { locale: otherLocale });

    return (
        <Tooltip title={tooltipText}>
            <Link href={pathname} locale={otherLocale} style={{ textDecoration: "none" }}>
                {flag}
            </Link>
        </Tooltip>
    );
};

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations('Header.ThemeSwitcher');

    const tooltipText = theme === 'light' ? t('switchToNight') : t('switchToDay');

    return (
        <Tooltip title={tooltipText}>
            <div onClick={toggleTheme} style={{ cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            </div>
        </Tooltip>
    );
};

const Header: React.FC = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            label: <Link href="/">Home</Link>,
            key: "/",
        },
        {
            label: <Link href="/user-classifications">User Classifications</Link>,
            key: "/user-classifications",
        },
        {
            label: <Link href="/secret">Secret</Link>,
            key: "/secret",
        },
    ];

    return (
        <div className={styles.headerContainer}>
            <Menu mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
            <div className={styles.rightContainer}>
                <LocaleSwitcher />
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Header;