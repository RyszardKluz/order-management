import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../../helpers/submitHandler';

const AddClientModal = ({ isVisible, onClose, onShowToast, fetchClients }) => {
  const [state, setState] = useState({
    clientName: '',
    clientSurname: '',
    clientAddress: '',
  });
  const client = {
    clientName: state.clientName,
    clientSurname: state.clientSurname,
    clientAddress: state.clientAddress,
  };

  const inputFieldsToValidate = [
    'clientName',
    'clientSurname',
    'clientAddress',
  ];

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const resetFields = () =>
    setState({
      clientName: '',
      clientSurname: '',
      clientAddress: '',
    });

  const handleSubmit = async (e) => {
    submitHandler(
      e,
      `/clients`,
      'POST',
      client,
      inputFieldsToValidate,
      'Client',
      onShowToast,
      onClose,
      fetchClients,
      resetFields,
    );
  };

  return (
    <Modal
      show={isVisible}
      onHide={() => {
        onClose();
        resetFields();
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Client Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Client Name"
              value={state.clientName}
              onChange={(e) => updateState({ clientName: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Surname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Client Surname"
              value={state.clientSurname}
              onChange={(e) => updateState({ clientSurname: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Address" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Client Address"
              value={state.clientAddress}
              onChange={(e) => updateState({ clientAddress: e.target.value })}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add New Client
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddClientModal;
