'use client';

import Link from 'next/link';
import {Session} from 'next-auth';
import {signOut} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';

type Props = {
  session: Session | null;
};

export default function Index({session}: Props) {
  const t = useTranslations('Index');
  const locale = useLocale();

  function onLogoutClick() {
    signOut();
  }

  function Test() {
    async function fetchProtectedData() {
      const response = await fetch('/api/protected', {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Protected Data:', data);
      } else {
        console.error('Error fetching protected data:', response.statusText);
      }
    }
    
    return (
        <div>
          Test
          <button onClick={fetchProtectedData}>Test</button>
        </div>
    )
  }

  return (
    <PageLayout title={t('title')}>
      <Test/>
      {session ? (
        <>
          <p>{t('loggedIn', {username: session.user?.name})}</p>
          <p>
            <Link href={locale + '/secret'}>{t('secret')}</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            {t('logout')}
          </button>
        </>
      ) : (
        <>
          <p>{t('loggedOut')}</p>
          <Link href={locale + '/login'}>{t('login')}</Link>
        </>
      )}
    </PageLayout>
  );
}
