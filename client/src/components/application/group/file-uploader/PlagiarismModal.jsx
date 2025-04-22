import { Box, TextField } from "@mui/material";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DateFormatter from "utils/DateFormatter";
import ReportGenerating from "../../../elements/ReportGenerating";
function PlagiarismModal(props) {
  return (
    <>
      <Box component="div" className="plagiarism-report">
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
          id="plagiarism"
        >
          <Modal.Header closeButton>
            <Modal.Title>Plagiarism Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.loading ? (
              <ReportGenerating />
            ) : (
              <Box component="div" className="name-your-group">
                <Box component="div" className="group-photo-add">
                  <Box component="div" className="custom-input" flex="4">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>SN.</TableCell>
                            <TableCell>File Name</TableCell>
                            <TableCell>Submitted By</TableCell>
                            <TableCell>Submitted At</TableCell>
                            <TableCell>Matching %</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props?.data?.map((row, index) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell>{row[0].name}</TableCell>
                              <TableCell>{row[0]?.userId?.name}</TableCell>
                              <TableCell>
                                {DateFormatter(row[0].createdAt)}
                              </TableCell>
                              <TableCell>{row[1].toFixed(2)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {props?.data?.length < 1 && (
                      <Box padding="10px" textAlign={"center"}>
                        No result found
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default PlagiarismModal;
