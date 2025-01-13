import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../../helpers/submitHandler';
import deleteHandler from '../../../helpers/deleteHandler';

const ChangeClientModal = ({
  isVisible,
  onClose,
  clientId,
  fetchClients,
  onShowToast,
}) => {
  const [state, setState] = useState({
    clientName: '',
    clientSurname: '',
    clientAddress: '',
  });

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const resetFormFields = () => {
    setState({
      clientName: '',
      clientSurname: '',
      clientAddress: '',
    });
  };

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

  const handleSubmit = async (e) => {
    submitHandler(
      e,
      `/clients/${clientId}`,
      'PATCH',
      client,
      inputFieldsToValidate,
      'Client',
      onShowToast,
      onClose,
      fetchClients,
      resetFormFields,
    );
  };

  const handleDelete = () => {
    deleteHandler(
      '/clients',
      clientId,
      'DELETE',
      'Client',
      onShowToast,
      onClose,
      fetchClients,
    );
  };

  return (
    <Modal
      show={isVisible}
      onHide={() => {
        onClose();
        resetFormFields();
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Client Name" className="mb-3">
            <Form.Control
              placeholder="Client Name"
              value={state.clientName}
              onChange={(e) => updateState({ clientName: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Surname" className="mb-3">
            <Form.Control
              placeholder="Client Surname"
              value={state.clientSurname}
              onChange={(e) => updateState({ clientSurname: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Address" className="mb-3">
            <Form.Control
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
            Update Client Information
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Client
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangeClientModal;
