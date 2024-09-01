import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

type Props = {
    params: { locale: string }
};

const HomePage = ({params: {locale}}: Props) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('IndexPage');

    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    );
};

export default HomePage;
