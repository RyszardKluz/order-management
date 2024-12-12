import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const AddClientModal = ({ isVisible, close }) => {
  const [clientSurname, setClientSurname] = useState('');
  const [clientName, setClientName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const client = {
      clientName: clientName,
      clientSurname: clientSurname,
    };
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
      close();
      setClientName('');
      setClientSurname('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={isVisible} onHide={close}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Enter client details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel label="Client Name" className="mb-3">
              <Form.Control
                type="clienName"
                placeholder="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Client Surname">
              <Form.Control
                type="clientSurname"
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
              Add new Client
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddClientModal;
