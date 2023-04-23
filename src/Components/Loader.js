import { CircularProgress } from "@mui/material";

function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 8, // set the z-index to 8
      }}>
      <CircularProgress color="inherit" />
    </div>
  );
}

export default Loader;
