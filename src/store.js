import { createContext } from "react";

const LanguageContext = createContext({
  languageType: { id: "hi", label: "Hindi" },
  setLanguageType: () => {},
  words: [], // empty array to store words
  setWords: () => {},
});
export default LanguageContext;
