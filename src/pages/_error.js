import { Grid, Typography, Button, Fade, Box } from "@mui/material";
import { useRouter } from "next/router";

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: "100vh" }}>
      <Grid item>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                position: "relative",
                display: "inline-block",
                animation: "wave 1.5s linear infinite 0.3s",
                "@keyframes wave": {
                  "0%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                  "100%": { transform: "translateY(0)" },
                },
              }}>
              4
            </Typography>
            <Typography
              variant="h1"
              sx={{
                position: "relative",
                display: "inline-block",
                animation: "wave 1.5s linear infinite 0.6s",
                "@keyframes wave": {
                  "0%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                  "100%": { transform: "translateY(0)" },
                },
              }}>
              0
            </Typography>
            <Typography
              variant="h1"
              sx={{
                position: "relative",
                display: "inline-block",
                animation: "wave 1.5s linear infinite 0.9s",
                "@keyframes wave": {
                  "0%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                  "100%": { transform: "translateY(0)" },
                },
              }}>
              4
            </Typography>
          </Box>
        </Fade>
      </Grid>

      <Grid item>
        <Fade in={true} timeout={2000}>
          <Typography variant="h4">
            {statusCode === 404
              ? "Oops! The page you are looking for does not exist."
              : `Oops! An error occurred. Status Code: ${statusCode}`}
          </Typography>
        </Fade>
      </Grid>

      <Grid item>
        <Fade in={true} timeout={3000}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}>
            Return to Home Page
          </Button>
        </Fade>
      </Grid>
    </Grid>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
