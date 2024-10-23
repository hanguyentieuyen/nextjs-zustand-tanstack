import { createInstance } from "i18next";
import { getOptions, LocaleTypes } from "./setting";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";

const initI18next = async(lang: LocaleTypes, ns: string) => {
    const i18nInstance = createInstance()
    await i18nInstance.use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: typeof ns) => {
        console.log('namespace: ', namespace)
        console.log('langPath: ', `./locales/${language}/${namespace}.json`)
        return import (`./locales/${language}/${namespace}.json`)
    }))
    .init(getOptions(lang,ns))

    return i18nInstance
}

export async function createTranslation(lang: LocaleTypes, ns: string){
    const i18nextInstance = await initI18next(lang, ns)
    return {
        t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0]:ns)
    }
}