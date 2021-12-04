import * as Localization from "expo-localization";
import i18n from "i18n-js";

//Importación de jsons idiomas
import * as enL from "./translations/en.json";
import * as esL from "./translations/es.json";
import * as frL from "./translations/fr.json";
import * as jpL from "./translations/jp.json";

//
i18n.translations = {
    en: enL,
    es: esL,
    fr: frL,
    ja: jpL,
};
//
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;