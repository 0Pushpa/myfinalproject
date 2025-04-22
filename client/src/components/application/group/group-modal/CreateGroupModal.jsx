import { Box, TextField } from "@mui/material";
import React from "react";
import { Button, Modal } from "react-bootstrap";

function CreateGroupModal(props) {
  return (
    <>
      <Box component="div">
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {props.isEdit ? "Edit group" : "Create a group"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box component="div" className="name-your-group">
              <Box component="div" className="group-photo-add">
                <Box component="div" className="custom-input" flex="4">
                  <TextField
                    id="outlined-basic"
                    label="Enter Group Name"
                    variant="outlined"
                    type="text"
                    value={props.groupName}
                    style={{
                      width: "100%",
                    }}
                    onChange={props.handleChange}
                  ></TextField>
                </Box>
              </Box>
            </Box>
            {/* <Box component="div" class="search-container">
              <Searchbar onSearch={undefined} />
            </Box>
            <Box component="div" className="contact-modal-list">
              <ul>
                <li>
                  <Box component="div" className="contact-modal-flex">
                    <Box component="div" className="contact-modal-flex1">
                      <Box component="span" className="contact-modal-flex-user">
                        <img alt="my-img" src={Navbarimg} />
                      </Box>
                    </Box>
                    <Box component="div" className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Ram Kumar Sapkota
                      </h3>
                    </Box>
                    <Box component="div" className="contact-modal-flex3">
                      <Box
                        component="span"
                        className="contact-modal-flexaddicon"
                      >
                        <IoIosAdd />
                      </Box>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box component="div" className="contact-modal-flex">
                    <Box component="div" className="contact-modal-flex1">
                      <Box component="span" className="contact-modal-flex-user">
                        <img alt="my-img" src={Contactimg} />
                      </Box>
                    </Box>
                    <Box component="div" className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Aman Kumar Gupta
                      </h3>
                    </Box>
                    <Box component="div" className="contact-modal-flex3">
                      <Box
                        component="span"
                        className="contact-modal-flexaddicon"
                      >
                        <IoIosAdd />
                      </Box>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box component="div" className="contact-modal-flex">
                    <Box component="div" className="contact-modal-flex1">
                      <Box component="span" className="contact-modal-flex-user">
                        <img alt="my-img" src={Contactimg1} />
                      </Box>
                    </Box>
                    <Box component="div" className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Upu Adhikari Subod
                      </h3>
                    </Box>
                    <Box component="div" className="contact-modal-flex3">
                      <Box
                        component="span"
                        className="contact-modal-flexaddicon"
                      >
                        <IoIosAdd />
                      </Box>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box component="div" className="contact-modal-flex">
                    <Box component="div" className="contact-modal-flex1">
                      <Box component="span" className="contact-modal-flex-user">
                        <img alt="my-img" src={Navbarimg} />
                      </Box>
                    </Box>
                    <Box component="div" className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Kilesh Bahadur Rajbhandari
                      </h3>
                    </Box>
                    <Box component="div" className="contact-modal-flex3">
                      <Box
                        component="span"
                        className="contact-modal-flexaddicon"
                      >
                        <IoIosAdd />
                      </Box>
                    </Box>
                  </Box>
                </li>
              </ul>
            </Box> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.service}>
              {props.isEdit ? "Save" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default CreateGroupModal;
