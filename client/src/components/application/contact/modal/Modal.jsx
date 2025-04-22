import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { data } from "../ContactData";

function ContactModal(props) {
  const [searchterm, setSearchTerm] = useState("");

  const pickValue = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add to contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="search-container">
              <input
                type="text"
                name="search"
                placeholder="Search contacts"
                className="contact-modal-input"
                onChange={pickValue}
              />
              <span className="search-i">
                <FiSearch />
              </span>
              <span className="contact-modaladdicon">
                <IoIosAdd />
              </span>
            </div>
            <div className="contact-modal-list">
              <ul>
                {}
                {data
                  .filter((fil) => {
                    if (searchterm === "") {
                      return fil;
                    } else if (
                      fil.name.toLowerCase().includes(searchterm.toLowerCase())
                    ) {
                      return fil;
                    } else {
                      return null;
                    }
                  })
                  .map((d) => {
                    return (
                      <li>
                        <div className="contact-modal-flex">
                          <div className="contact-modal-flex1">
                            <span className="contact-modal-flex-user">
                              <img src={d.image} alt="man" />
                            </span>
                          </div>
                          <div className="contact-modal-flex2">
                            <h3 className="contact-modal-flex2-h3">{d.name}</h3>
                          </div>
                          <div className="contact-modal-flex3">
                            <span className="contact-modal-flexaddicon">
                              <IoIosAdd />
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ContactModal;
