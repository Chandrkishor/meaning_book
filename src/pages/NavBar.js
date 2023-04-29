import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
// eslint-disable-next-line import/no-unresolved
import LanguageContext from "@/store";
import { useRouter } from "next/router";

function ResponsiveAppBar() {
  const { languageType, setLanguageType } = useContext(LanguageContext);
  const router = useRouter();

  const [langOptions, setLangOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then(({ data }) => {
        let val = data.map((e) => ({ id: e?.code, label: e?.name }));
        setLangOptions(val);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: "auto" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}>
            <span
              style={{
                cursor: "pointer",
              }}>
              Your words
            </span>
          </Typography>

          <Autocomplete
            id="language-select"
            options={langOptions}
            sx={{
              width: 300,
              "& .MuiInputLabel-root": {
                color: "inherit",
              },
              "& .Mui-selected": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
              "& input": {
                color: "inherit",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiAutocomplete-input": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "3px",
              },
            }}
            value={languageType}
            onChange={(e, val) => {
              setLanguageType(val);
            }}
            isOptionEqualToValue={(option, value) =>
              option?.id === (value?.id ?? value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={null}
                InputLabelProps={{ shrink: false }}
                placeholder={"Select Language Type"}
              />
            )}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
