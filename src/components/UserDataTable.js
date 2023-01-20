import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { CSVLink } from "react-csv";
//import csv from "./csv";

export const setUserData = (list) => {
  localStorage.setItem("userList", JSON.stringify(list));
};

export const getUserData = () => {
  let userList = JSON.parse(localStorage.getItem("userList"));
  if (!userList) {
    setUserData([]);
  }

  return JSON.parse(localStorage.getItem("userList"));
};

const columns = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "E-mail" },
  { id: "dateOfBirth", label: "Dob" },
  { id: "address", label: "Address" },
  { id: "country", label: "Country" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

function createData(id, name, email, dateOfBirth, address, country) {
  return { id, name, email, dateOfBirth, address, country };
}

const rows = [
  createData("234", "Prachi", "aa@gmail", 123, "at s", "AX"),
  createData("234", "Prachi", "aa@gmail", 123, "at s", "AX"),
  createData("234", "Prachi", "aa@gmail", 123, "at s", "AX"),
  createData("234", "Prachi", "aa@gmail", 123, "at s", "AX"),
];
export default function UserDataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userList = getUserData();
  const [list, setList] = useState(userList);

  const data = [
    {
      id: "1",
      name: "Tfg",
      email: "tfg@gmail.com",
      dateOfbirth: "",
      address: "asd",
      country: "df",
    },
    {
      id: "2",
      name: "gp",
      email: "gp@gmail.com",
      dateOfbirth: "",
      address: "ahd",
      country: "th",
    },
    {
      id: "3",
      name: "dfg",
      email: "cv@gmail.com",
      dateOfbirth: "",
      address: "dty",
      country: "ds",
    },
  ];

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (i) => {
    console.log("🚀 ~ file: UserDataTable.js:94 ~ deleteUser ~ i", i);

    let list1 = [...userList];
    list1.splice(i, 1);
    setList(list1);
    console.log("🚀 ~ file: UserDataTable.js:97 ~ deleteUser ~ list", list1);
    setUserData(list1);
  };
  return (
    <div className="container">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 className="text-center">User Data Table</h2>
        <TableContainer sx={{ minWidth: 650 }}>
          <Table stickyHeader aria-label="sticky table " className="TableCell">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.Dob}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>
                        <Link to={`/edit-user/${row.id}`} state={{ data: row }}>
                          <Button variant="outlined" startIcon={<EditIcon />}>
                            {" "}
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteUser(i)}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Link to="/add-user" className="btn btn-primary my-5">
        Add User
      </Link>

      <div className="container">
        <CSVLink data={rows}>Download data</CSVLink>
      </div>
    </div>
  );
}
