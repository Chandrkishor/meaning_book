import axios from "axios";
export const TranslateApiFun = (word, sourceLang, targetLang, callback) => {
  const url = `https://api.mymemory.translated.net/get?q=${word}&langpair=${sourceLang}|${targetLang.id}`;
  axios
    .get(url)
    .then(({ data }) => {
      console.log(".then ~ data: >>", data);
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback(null);
    });
};
