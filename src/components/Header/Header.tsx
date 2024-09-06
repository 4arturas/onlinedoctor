'use client';

import {SunOutlined, MoonOutlined} from '@ant-design/icons';
import {Avatar, Button, Menu, Switch, Tooltip} from 'antd';
import {useLocale, useTranslations} from 'next-intl';
import styles from './Header.module.css';
import {useTheme} from '@/app/[locale]/ThemeContext';
import {Link, usePathname} from '@/i18n/routing';

function LocaleSwitcher() {
  const t = useTranslations('Header.LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'de' : 'en';
  const pathname = usePathname();
  const flag = otherLocale === 'en' ? '🇬🇧' : '🇩🇪';
  const tooltipText = t('switchLocale', {locale: otherLocale});

  return (
    <Tooltip title={tooltipText}>
      <Link
        href={pathname}
        locale={otherLocale}
        style={{textDecoration: 'none'}}
      >
        <Avatar>
          {flag}
        </Avatar>
      </Link>
    </Tooltip>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header.ThemeSwitcher');
  const tooltipText = theme === 'light' ? t('switchToNight') : t('switchToDay');

  const isDark = theme === 'dark';

  return (
    <Tooltip title={tooltipText}>
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
    </Tooltip>
  );
}

function Header() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: <Link href="/">Home</Link>,
      key: '/'
    },
    {
      label: <Link href="/secret">Secret</Link>,
      key: '/secret'
    }
  ];

  return (
    <div className={styles.headerContainer}>
      <Menu items={menuItems} mode="horizontal" selectedKeys={[pathname]} />
      <div className={styles.rightContainer}>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Header;
