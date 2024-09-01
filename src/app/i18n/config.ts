import {Pathnames} from "next-intl/routing";
import {LocalePrefixes} from "next-intl/dist/types/src/routing/types";

export type Locale = (typeof locales)[number];

export const locales = ['en', 'de'] as const;
export const defaultLocale: Locale = 'en';

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
    "/":"/",
    "/pathnames":"/pathnames",
};

export const localePrefix: LocalePrefixes<Locales> = "always";