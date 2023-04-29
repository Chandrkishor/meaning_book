import React, { useCallback, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// eslint-disable-next-line import/no-unresolved
// import LanguageContext from "@/store";
import axios from "axios";

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
  const [word, setWord] = useState({});
  const getTableData = useCallback((pageNo = 0, rowPerPage = 10) => {
    axios
      .get(`/api/tableData?cursor=${pageNo}&count=${rowPerPage}`)
      .then(({ data }) => {
        console.log("axios.get ~ data: >>", data.data);
        setWord(data.data);
      })
      .catch((error) => {
        console.error(`Failed to retrieve data from API: ${error}`);
      })
      .finally(() => {
        console.log("Request complete!");
      });
  }, []);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const handleDelete = (id) => {
    console.log("WordTable ~ words: >>", word);
    console.log("handleDelete ~ id: >>", id);
    // const newValue = words.filter((e) => e.word === id);// to get the id and remove form db
    const newValue = word.filter((e) => e.word !== id);
    setWord(newValue);
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
        {Object.entries(word).map(([key, value]) => (
          <MyTableRow key={`${key}${value}`}>
            <MyTableCell sx={{ p: "5px" }}>{key ?? ""}</MyTableCell>
            <MyTableCell sx={{ p: "5px" }}>{value ?? ""}</MyTableCell>
            <MyActionCell sx={{ p: "5px" }}>
              <IconButton color="primary" onClick={() => handleDelete(key)}>
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
