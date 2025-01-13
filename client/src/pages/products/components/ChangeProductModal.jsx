import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../../helpers/submitHandler';
import deleteHandler from '../../../helpers/deleteHandler';

const ChangeProductModal = ({
  isVisible,
  onClose,
  productId,
  onShowToast,
  fetchProducts,
}) => {
  const [state, setState] = useState({
    productPrice: '',
    productName: '',
  });

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const product = {
    productName: state.productName,
    productPrice: state.productPrice,
  };

  const inputFieldsToValidate = ['productName', 'productPrice'];

  const resetFormFields = () => {
    setState({ productName: '', productPrice: '' });
  };

  const handleSubmit = (e) => {
    submitHandler(
      e,
      `/products/${productId}`,
      'PATCH',
      product,
      inputFieldsToValidate,
      'Product',
      onShowToast,
      onClose,
      fetchProducts,
      resetFormFields,
    );
  };

  const handleDelete = () => {
    deleteHandler(
      '/products',
      productId,
      'DELETE',
      'Product',
      onShowToast,
      onClose,
      fetchProducts,
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
            <Modal.Title>Edit product details</Modal.Title>
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
              Update product
            </Button>
            <Button onClick={handleDelete}>Delete Product</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeProductModal;
