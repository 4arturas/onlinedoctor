import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ReactNode} from 'react';
import Navigation from "@/components/Navigation";
import {ThemeProvider} from "@/app/[locale]/ThemeContext";
import './themes.css';

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
        <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Navigation/>
                {children}
            </NextIntlClientProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
