import axios from "axios";

export const TranslateApiFun = (inputValue, languageType, callBack) => {
  const params = new URLSearchParams();
  params.append("q", inputValue);
  params.append("source", "en"); //from
  params.append("target", languageType?.id); // to
  params.append("api_key", process.env.apiKey);

  axios
    .post("https://libretranslate.de/translate", params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => {
      callBack(data?.translatedText);
    })
    .catch((err) => {
      callBack("error");
      console.log("something went wrong", err);
    });
};

export const HandleSaveFun = async (val) => {
  try {
    if (val?.length) {
      const res = await fetch("/api/wrds", {
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });
      res.json({ data: "Your word Saved" });
    }
  } catch (error) {
    console.error(`Failed to save array to Redis: ${error}`);
  }
};
