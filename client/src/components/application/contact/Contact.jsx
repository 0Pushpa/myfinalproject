import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FiSearch } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import ContactModal from "./modal/Modal";

import { RiDeleteBin2Line } from "react-icons/ri";
import Page from "../../page";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone_no",
    label: "Phone No",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, email, phone_no, action) {
  return { name, email, phone_no, action };
}

const rows = [
  createData(
    "Ram Bahadur Thapa",
    "rambahadur@gmail.com",
    9841647064,

    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Tina Kumari Jha",
    "tinakumarijha@gmail.com",
    9824646464,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Lilly Shingh",
    "tonnykakkar@gmail.com",
    9830483973,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Tonny Kakkar",
    "lillyshigh@gmail.com",
    9867167434,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Anguli Baba",
    "angulibaba@gmail.com",
    986602103,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Maria Venakava",
    "mariavakava@gmail.com",
    25475400,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Denis Ritche",
    "dennisritchhe@gmail.com",
    83019200,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Paris Maharjan",
    "paris@gmail.com",
    4857000,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Mangaka Lala",
    "maha@gmail.com",
    126577691,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Japan",
    "JP",
    126317000,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "France",
    "FR",
    67022000,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "United Kingdom",
    "GB",
    67545757,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Russia",
    "RU",
    146793744,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Nigeria",
    "NG",
    200962417,
    <RiDeleteBin2Line className="del-btn" />
  ),
  createData(
    "Brazil",
    "BR",
    210147125,
    <RiDeleteBin2Line className="del-btn" />
  ),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Page title="Slate | Contacts">
      <div className="frontend-contact">
        <div className="contact-main">
          <div className="contact-nav">
            <div className="contact-nav-flex1">
              <div class="search-container">
                <input
                  type="text"
                  name="search"
                  placeholder="Search contacts"
                />
                <span className="search-i">
                  <FiSearch />
                </span>
              </div>
            </div>
            <div className="contact-nav-flex2"></div>
            <div className="contact-nav-flex3">
              <div className="contact-nav-add-main" onClick={handleShow}>
                <ul>
                  <li className="contact-nav-li">
                    <span className="contact-nav-add">
                      <TiUserAddOutline />
                    </span>
                  </li>
                  <li className="contact-nav-li">
                    <span className="contact-nav-text">Add a contact</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Paper className={classes.root} id="contact-table__top">
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
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
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <div>
            <ContactModal
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
