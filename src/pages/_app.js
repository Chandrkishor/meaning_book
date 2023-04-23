import "@/styles/globals.css";
import ResponsiveAppBar from "./NavBar";
import { useState } from "react";
import LanguageContext from "@/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";

export default function App({ Component, pageProps }) {
  const [languageType, setLanguageType] = useState({
    id: "hi",
    label: "Hindi",
  });
  const [words, setWords] = useState([
    { word: "Hello", meaning: "Greeting" },
    { word: "Goodbye", meaning: "Farewell" },
    { word: "Thank you", meaning: "Expression of gratitude" },
  ]);

  return (
    <LanguageContext.Provider
      value={{ languageType, setLanguageType, words, setWords }}>
      <Grid sx={{ fontFamily: "Roboto", fontWeight: "500" }}>
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </Grid>
    </LanguageContext.Provider>
  );
}
