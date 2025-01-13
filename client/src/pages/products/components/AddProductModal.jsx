import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../../helpers/submitHandler';

const AddProductModal = ({
  isVisible,
  onClose,
  onShowToast,
  fetchProducts,
}) => {
  const [state, setState] = useState({
    productName: '',
    productPrice: '',
  });

  const product = {
    productPrice: state.productPrice,
    productName: state.productName,
  };

  const inputFieldsToValidate = ['productName', 'productPrice'];

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const resetFormFields = () => {
    setState({ productPrice: '', productName: '' });
  };
  const handleSubmit = async (e) => {
    submitHandler(
      e,
      '/products',
      'POST',
      product,
      inputFieldsToValidate,
      'Product',
      onShowToast,
      onClose,
      fetchProducts,
      resetFormFields,
    );
  };

  return (
    <>
      <Modal
        show={isVisible}
        onHide={() => {
          onClose();
          resetFormFields();
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Enter product details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel label="Product Name" className="mb-3">
              <Form.Control
                type="productName"
                placeholder="Product Name"
                value={state.productName}
                onChange={(e) => updateState({ productName: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel label="Product Price">
              <Form.Control
                type="productPrice"
                placeholder="Product Price"
                value={state.productPrice}
                onChange={(e) => updateState({ productPrice: e.target.value })}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
