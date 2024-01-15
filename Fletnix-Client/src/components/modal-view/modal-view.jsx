import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ModalView = ({ showModal, hideModal, type, deleteAccount, message, title }) => {

  const navigate = useNavigate()

  return (
    <Modal show={showModal} className='text-align-center'>
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
        {type === 'danger' ? (
          <>
            <Button variant="default" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteAccount}>
              Confirm Delete
            </Button>
          </>
        ) : type === 'success' ? (
          <Button variant="default" onClick={() => navigate('/login')}>
            Ok
          </Button>
        ) : (
          <Button variant="default" onClick={hideModal}>
            Back
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalView;