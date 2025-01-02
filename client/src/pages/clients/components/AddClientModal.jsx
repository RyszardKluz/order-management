import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const AddClientModal = ({
  isVisible,
  onClose,
  onAdd,
  onShowSuccessToast,
  onShowErrorToast,
}) => {
  const [clientSurname, setClientSurname] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const clientData = {
      clientName,
      clientSurname,
      clientAddress,
    };
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (
        clientName.trim() === '' ||
        clientSurname.trim() === '' ||
        clientAddress.trim() === ''
      ) {
        throw new Error('All fields are required');
      }
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
      onClose();
      resetFormFields();
      onAdd();
      onShowSuccessToast('Created new client');
    } catch (error) {
      console.error(error);
      onShowErrorToast(error.message);
    }
  };

  const resetFormFields = () => {
    setClientName('');
    setClientSurname('');
    setClientAddress('');
  };

  return (
    <Modal
      show={isVisible}
      onHide={() => {
        onClose();
        resetFormFields();
      }}
    >
      <Form onSubmit={handleFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Client Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Surname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Client Surname"
              value={clientSurname}
              onChange={(e) => setClientSurname(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Client Address" className="mb-3">
            <Form.Control
              type="text"
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
            Add New Client
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddClientModal;
