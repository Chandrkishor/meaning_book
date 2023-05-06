// eslint-disable-next-line
import LanguageContext from "@/store";
import { Button, Stack } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

function MyPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [langOptions, setLangOptions] = useState([]);
  const theme = useTheme();

  const { languageType, setLanguageType } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then(({ data }) => {
        let val = data.map((e) => ({ id: e?.code, label: e?.name }));
        setLangOptions(val);
      })
      .catch((err) => {
        setLangOptions([
          { label: "Hindi", id: "hi" },
          { label: "English", id: "en" },
        ]);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}>
        {languageType?.label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Stack direction="column">
          {langOptions.map((item) => {
            return (
              <Button
                variant="text"
                sx={{
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: "#ddd",
                  },
                }}
                onClick={() => {
                  setLanguageType(item);
                  setAnchorEl(null);
                }}>
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Popover>
    </div>
  );
}
export default MyPopover;
