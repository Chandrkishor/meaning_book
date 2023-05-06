import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
// eslint-disable-next-line import/no-unresolved
import MyPopover from "@/Components/PopOver";
// eslint-disable-next-line import/no-unresolved
import SearchAppBar from "@/Components/Search";

function ResponsiveAppBar() {
  const router = useRouter();

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ minHeight: "0px !important", p: 1 }}>
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
              Meaning Book
            </span>
          </Typography>
          <SearchAppBar />
          <MyPopover />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
