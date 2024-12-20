import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const ChangeClientModal = ({
  isVisible,
  onClose,
  clientId,
  onUpdateUI,
  onShowSuccessToast,
  onShowErrorToast,
}) => {
  const [clientSurname, setClientSurname] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const handleResetInputs = () => {
    setClientAddress('');
    setClientName('');
    setClientSurname('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = {
      clientName,
      clientSurname,
      clientAddress,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/clients/${clientId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(client),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update client credentials');
      }
      const data = await response.json();
      console.log(data);
      onClose();
      handleResetInputs();
      onShowSuccessToast('Successfully updated client credentials ');
      onUpdateUI();
    } catch (error) {
      console.error(error);
      onShowErrorToast(error.message);
    }
  };

  const handleDeleteClient = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/clients/${clientId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete client');
      }
      const data = await response.json();
      onClose();
      onUpdateUI();
      onShowSuccessToast('Successfully deleted client');
      console.log(data);
    } catch (error) {
      console.error(error);
      onShowErrorToast(error.message);
    }
  };

  return (
    <Modal
      show={isVisible}
      onHide={() => {
        onClose();
        handleResetInputs();
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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Surname" className="mb-3">
            <Form.Control
              placeholder="Client Surname"
              value={clientSurname}
              onChange={(e) => setClientSurname(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Address" className="mb-3">
            <Form.Control
              placeholder="Client Address"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
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
          <Button variant="danger" onClick={handleDeleteClient}>
            Delete Client
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangeClientModal;
