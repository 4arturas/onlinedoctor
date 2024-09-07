'use client';

import {SunOutlined, MoonOutlined, MenuOutlined} from '@ant-design/icons';
import {Avatar, Menu, Switch, Tooltip, Button, Drawer} from 'antd';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';
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
      <Link href={pathname} locale={otherLocale} style={{textDecoration: 'none'}}>
        <Avatar>{flag}</Avatar>
      </Link>
    </Tooltip>
  );
}

function ThemeSwitcher() {
  const {theme, toggleTheme} = useTheme();
  const t = useTranslations('Header.ThemeSwitcher');
  const tooltipText = theme === 'light' ? t('switchToNight') : t('switchToDay');
  const isDark = theme === 'dark';

  return (
    <Tooltip title={tooltipText}>
      <Switch
        checked={isDark}
        checkedChildren={<MoonOutlined />}
        onChange={toggleTheme}
        unCheckedChildren={<SunOutlined />}
      />
    </Tooltip>
  );
}

function Header() {
  const pathname = usePathname();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    {
      label: <Link href="/">Home</Link>,
      key: '/'
    },
    {
      label: <Link href="/user-classifications">Classifications</Link>,
      key: '/user-classifications'
    },
    {
      label: <Link href="/users">Users</Link>,
      key: '/users'
    },
    {
      label: <Link href="/secret">Secret</Link>,
      key: '/secret'
    },
    {
      label: (
        <div className={styles.rightContainer}>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      ),
      key: 'switchers',
      style: {marginLeft: 'auto'} // Push to the right
    }
  ];

  return (
    <div className={styles.headerContainer}>
      <Button
        className={styles.menuButton}
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
      />
      <Drawer
        bodyStyle={{ padding: 0 }}
        onClose={() => setDrawerVisible(false)}
        placement="left"
        title="Menu"
        visible={drawerVisible}
      >
        <Menu
          items={menuItems}
          mode="inline"
          selectedKeys={[pathname]}
        />
      </Drawer>
      <Menu
        className={styles.desktopMenu}
        items={menuItems}
        mode="horizontal"
        selectedKeys={[pathname]}
      />
    </div>
  );
}

export default Header;