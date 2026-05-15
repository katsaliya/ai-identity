import en from "./en";
import es from "./es";
import zh from "./zh";
import tl from "./tl";
import hi from "./hi";
import ar from "./ar";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "tl", label: "Tagalog" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
];

const translations = { en, es, zh, tl, hi, ar };

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations["en"][key];
}
