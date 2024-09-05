import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ReactNode} from 'react';
import {ThemeProvider} from '@/app/[locale]/ThemeContext';
import './themes.css';
import Header from '@/components/Header/Header';
import Footer from "@/components/Footer/Footer";

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
        <div className="site-container"> {/* Ensure this div exists and is the only child of body */}
            <ThemeProvider>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header/>
                    <main className="content">{children}</main> {/* Main content area */}
                    <Footer/>
                </NextIntlClientProvider>
            </ThemeProvider>
        </div>
        </body>
        </html>
    );
}
