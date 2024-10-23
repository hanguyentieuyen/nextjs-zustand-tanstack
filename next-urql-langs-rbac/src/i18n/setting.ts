import type {InitOptions} from 'i18next'
export const fallbackLanguage = 'en'
export const locales = [fallbackLanguage, 'vi']
export const defaultNS = 'common'
export type LocaleTypes = (typeof locales)[number]

export const getOptions=(lang = fallbackLanguage, ns = defaultNS): InitOptions => {
    return {
        supportedLngs: locales,
        fallbackLng: fallbackLanguage,
        fallbackNS: defaultNS,
        defaultNS,
        lng: lang,
        ns
    }
}
