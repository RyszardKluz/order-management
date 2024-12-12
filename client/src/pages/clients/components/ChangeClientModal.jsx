import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const ChangeClientModal = ({ isVisible, close, clientId }) => {
  const [clientSurname, setClientSurname] = useState('');
  const [clientName, setClientName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = {
      clientName: clientName,
      clientSurname: clientSurname,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/clients/${clientId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update Client credentials');
      }
      const data = await response.json();
      console.log(data);
      close();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/clients/${clientId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete a Client');
      }
      const data = await response.json();
      close();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={isVisible} onHide={close}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit client details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel label="Client Name" className="mb-3">
              <Form.Control
                placeholder="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel>
              <Form.Control
                placeholder="Client Surname"
                value={clientSurname}
                onChange={(e) => setClientSurname(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update client information
            </Button>
            <Button onClick={handleDelete}>Delete Client</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeClientModal;
