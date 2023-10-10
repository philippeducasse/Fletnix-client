import React from 'react'
import { Modal, Button } from "react-bootstrap";

const ModalView = ({ showModal, hideModal, deleteAccount, id, type, message, title }) => {
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className=
        {type === 'danger' ? (
          "alert alert-danger"
        ) : null
        }
      >{message}</div></Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
        {type === 'danger' ? (
          "Cancel"
        ) : "Back"
        }
        </Button>
        {type === 'danger' ? (
        <Button variant={type} onClick={() => deleteAccount()}>
          Delete
        </Button>
        ) : null 
        }
      </Modal.Footer>
    </Modal>
  )
}

export default ModalView;