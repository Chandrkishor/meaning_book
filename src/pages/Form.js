/* eslint-disable import/no-unresolved */
import { useContext, useState } from "react";
import { styled, alpha, Grid, Snackbar, Alert } from "@mui/material/";
import axios from "axios";
import LanguageContext from "@/store";
import Loader from "@/Components/Loader";
import { TranslateApiFun } from "@/Components/Utils";

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
  const [translatedVal, setTranslatedVal] = useState("");
  const { languageType } = useContext(LanguageContext);
  const [open, setOpen] = useState({
    status: false,
    message: "",
    severity: "error",
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTranslatedVal("");
    if (inputValue?.trim()?.length) {
      const { data } = await axios.get(`/api/wrds?${inputValue}`);
      if (data) {
        setTranslatedVal(data);
        setIsLoading(false);
      } else {
        let callBack = (data) => {
          setTranslatedVal(data);
          setIsLoading(false);
        };
        TranslateApiFun(inputValue, languageType, callBack);
      }
    } else {
      setOpen({
        status: true,
        message: "No data to search",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setOpen({ status: false, message: "", severity: "error" });
  };
  const HandleSaveFun = (word, meaning) => {
    let val = { word, meaning };
    try {
      if (meaning?.length && word.trim().length) {
        axios
          .post("/api/wrds", val, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then(({ data }) => {
            console.log(".then ~ data: >>", data);
            setOpen({
              status: true,
              message: data.message ?? "",
              severity: "success",
            });
          })
          .catch((err) => {
            console.log("something went wrong", err);
          });
      } else {
        setOpen({
          status: true,
          message: "No data to Save",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(`Failed to save array to Redis: ${error}`);
    }
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
            {translatedVal}
          </p>
        </Grid>
        <Grid item xs={12} sm={2} container justifyContent={"flex-end"}>
          <SubmitButton
            onClick={() => HandleSaveFun(inputValue, translatedVal)}>
            Add
          </SubmitButton>
        </Grid>
      </Grid>
      <Snackbar
        open={open.status}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={open.severity ?? "success"}>
          {open.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;
