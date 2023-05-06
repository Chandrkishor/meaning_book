/* eslint-disable import/no-unresolved */
import { useCallback, useContext, useEffect, useState } from "react";
import { styled, alpha, Grid, Snackbar, Alert } from "@mui/material/";
import axios from "axios";
import LanguageContext from "@/store";
import Loader from "@/Components/Loader";
import { TranslateApiFun } from "@/Components/Utils";

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
  const [isLoading, setIsLoading] = useState(true);
  const [translatedVal, setTranslatedVal] = useState("");
  const [matches, setMatches] = useState([]);
  const { languageType, searchedText } = useContext(LanguageContext);
  const [open, setOpen] = useState({
    status: false,
    message: "",
    severity: "error",
  });

  const handleSubmit = useCallback(() => {
    // setIsLoading(true);
    setTranslatedVal("");
    axios
      .get(`/api/wrds?${searchedText}`)
      .then(({ data }) => {
        if (data) {
          setTranslatedVal(data);
          setIsLoading(false);
        } else {
          let callBack = (data) => {
            setTranslatedVal(data.responseData.translatedText);
            setMatches(data.matches);
            setIsLoading(false);
          };
          TranslateApiFun(searchedText, "en", languageType, callBack);
        }
      })
      .catch((err) => {
        console.log("axios.get ~ err: >>", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [languageType, searchedText]);

  useEffect(() => {
    if (searchedText?.trim()?.length > 0) {
      handleSubmit();
    }
    // else {
    //   setOpen({
    //     status: true,
    //     message: "No data to search",
    //     severity: "error",
    //   });
    // }
  }, [handleSubmit, searchedText]);

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
    <Grid sx={{ padding: "5px 16px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Searching: {searchedText}
          </p>
        </Grid>

        <Grid item xs={12} sm={5}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}>
            Meaning: {translatedVal}
          </p>
        </Grid>

        <Grid item xs={12} sm={2} container justifyContent="flex-end">
          <SubmitButton
          // onClick={() => HandleSaveFun(searchedText, translatedVal)}
          >
            Add
          </SubmitButton>
        </Grid>
        {matches?.length ? (
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold" }}>Matching words:</p>
            <ul>
              {matches.map((match) => (
                <li key={match.id}>{match.translation},</li>
              ))}
            </ul>
          </Grid>
        ) : (
          ""
        )}
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
      {isLoading && <Loader />}
    </Grid>
  );
}

export default Form;
