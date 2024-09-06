'use client';

import {useTranslations} from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>{t('rights')}</p>
      </div>
    </footer>
  );
}
