'use client';

import Link from 'next/link';
import {Session} from 'next-auth';
import {signOut} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from "react";
import PageLayout from '@/components/PageLayout';

function Test() {
  const [msg, setMsg] = useState<string>("");

  async function fetchProtectedData() {
    const response = await fetch('/api/protected', {
      method: 'GET',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      setMsg(JSON.stringify(data));
    } else {
      setMsg(JSON.stringify('ERROR'));
    }
  }

  return (
    <div>
      Test<br/>
      <div>{msg}</div>
      <button onClick={fetchProtectedData} type='button'>Test</button>
    </div>
  )
}

type Props = {
  session: Session | null;
};

export default function Index({session}: Props) {
  const t = useTranslations('Index');
  const locale = useLocale();

  function onLogoutClick() {
    signOut();
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
