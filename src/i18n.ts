import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from '@/app/services/locale';

import { notFound } from "next/navigation"
import { locales } from "@/app/i18n/config"

export default getRequestConfig(async () => {
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});