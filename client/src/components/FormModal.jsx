import AddProductForm from './AddProductForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormModal({ onClose, onShow, onSubmit, defaultShow }) {
  const handleFormSubmit = (formData) => {
    onSubmit(formData); 
  };
  return (
    <>
      <Button variant="primary" onClick={onShow}>
        Add Product
      </Button>

      <Modal
        show={defaultShow}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add product name and price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductForm
            onCancel={onClose}
            onSubmit={handleFormSubmit}
          ></AddProductForm>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
