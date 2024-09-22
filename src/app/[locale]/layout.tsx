import { Provider } from 'jotai';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ReactNode} from 'react';
import {ThemeProvider} from '@/app/[locale]/ThemeContext';
import './themes.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({children, params: {locale}}: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
    <head>
      <title>next-intl & next-auth</title>
    </head>
    <body>
    <Provider>
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header/>
          <main className="content">{children}</main>
          <Footer/>
        </NextIntlClientProvider>
      </ThemeProvider>
    </Provider>
    </body>
    </html>
  );
}
