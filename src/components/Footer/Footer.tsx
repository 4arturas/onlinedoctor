"use client";

import styles from './Footer.module.css';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
    const t = useTranslations('Footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>{t('rights')}</p>
            </div>
        </footer>
    );
};

export default Footer;