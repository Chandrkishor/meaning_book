import { useContext, useState } from "react";
import { styled, alpha, Grid, Button } from "@mui/material/";
import axios from "axios";
import LanguageContext from "@/store";
import Loader from "@/Components/Loader";

const FormContainer = styled("form")({
  display: "flex",
  alignItems: "center",
  //   flexDirection: "column",
});

const InputField = styled("input")(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  width: "90%",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  borderRadius: theme.shape.borderRadius,
  "&:focus": {
    outline: "none",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
  margin: theme.spacing(4),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  border: "none",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
  },
}));

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedVal, setTranslatedVal] = useState({});
  const { languageType, setWords, words } = useContext(LanguageContext);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let val = inputValue?.split(",");

    const params = new URLSearchParams();
    params.append("q", val);
    params.append("source", "en"); //from
    params.append("target", languageType?.id); // to
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(({ data }) => {
        console.log(data);
        setTranslatedVal(data || []);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSave = () => {
    let wd = inputValue?.split(",");
    let result = translatedVal.translatedText?.split(",");
    const addedVal = result?.map((e, index) => ({
      word: wd?.[index],
      meaning: e,
    }));
    // console.log("addedVal ~ addedVal: >>", addedVal);
    setWords([...words, ...addedVal]);
  };
  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter comma-separated values"
          value={inputValue}
          onChange={handleInputChange}
        />
        <SubmitButton type="submit">
          {isLoading && <Loader />}Search
        </SubmitButton>
      </FormContainer>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} sm={5}>
          <p
            style={{
              margin: "1rem",
            }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginRight: "0.5rem",
              }}>
              Searching:
            </span>
            {inputValue}
          </p>
        </Grid>
        <Grid item xs={12} sm={5}>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginRight: "0.5rem",
              }}>
              Meaning:
            </span>
            {translatedVal.translatedText}
          </p>
        </Grid>
        <Grid item xs={12} sm={2} container justifyContent={"flex-end"}>
          <SubmitButton onClick={handleSave}>Add</SubmitButton>
        </Grid>
      </Grid>
    </>
  );
}

export default Form;
