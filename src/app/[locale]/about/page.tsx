import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

type Props = {
    params: { locale: string }
};

const AboutPage = ({params: {locale}}: Props) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('AboutPage');
    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    );
};

export default AboutPage;