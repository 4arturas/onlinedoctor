"use client"

import {useTranslations} from "next-intl";

const HomePage = () => {
    const t = useTranslations('IndexPage');

    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    );
};

export default HomePage;
