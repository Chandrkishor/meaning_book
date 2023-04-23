import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import LanguageContext from "@/store";

const MyTable = styled(Table)({
  minWidth: 650,
  tableLayout: "fixed",
  "& thead": {
    backgroundColor: "#2c614a",
    "& th": {
      fontWeight: "bold",
      fontSize: 16,
      color: "#fff",
      padding: "8px",
    },
  },
});

const MyTableRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: alpha("#000", 0.04),
  },
});

const MyTableCell = styled(TableCell)({
  fontWeight: "normal",
  p: "8px",
});

const MyActionCell = styled(TableCell)({
  "&:hover": {
    cursor: "pointer",
  },
});

const WordTable = () => {
  const { words, setWords } = useContext(LanguageContext);

  const handleDelete = (id) => {
    console.log("WordTable ~ words: >>", words);
    console.log("handleDelete ~ id: >>", id);
    // const newValue = words.filter((e) => e.word === id);// to get the id and remove form db
    const newValue = words.filter((e) => e.word !== id);
    setWords(newValue);
  };

  return (
    <MyTable>
      <TableHead>
        <TableRow>
          <MyTableCell>Word</MyTableCell>
          <MyTableCell>Meaning</MyTableCell>
          <MyTableCell>Action</MyTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {words.map((row, index) => (
          <MyTableRow key={row.word + index}>
            <MyTableCell sx={{ p: "5px" }}>{row.word ?? ""}</MyTableCell>
            <MyTableCell sx={{ p: "5px" }}>{row.meaning ?? ""}</MyTableCell>
            <MyActionCell sx={{ p: "5px" }}>
              <IconButton
                color="primary"
                onClick={() => handleDelete(row.word)}>
                <DeleteIcon />
              </IconButton>
            </MyActionCell>
          </MyTableRow>
        ))}
      </TableBody>
    </MyTable>
  );
};

export default WordTable;
