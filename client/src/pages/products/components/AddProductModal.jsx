import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const AddProductModal = ({
  isVisible,
  onClose,
  onShowSuccessToast,
  onShowErrorToast,
  fetchProducts,
}) => {
  const [productPrice, setProductPrice] = useState('');
  const [productName, setProductName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = {
      productName: productName,
      productPrice: productPrice,
    };
    try {
      const response = await fetch('http://localhost:5000/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (productName.trim() === '' || productPrice.trim() === '') {
        throw new Error('All fields required');
      }

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      fetchProducts();
      onClose();
      onShowSuccessToast('Successfully added product');
      resetFormFields();
    } catch (error) {
      console.log(error);
      onShowErrorToast(error.message);
    }
  };

  const resetFormFields = () => {
    setProductName('');
    setProductPrice('');
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
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Enter product details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel label="Product Name" className="mb-3">
              <Form.Control
                type="productName"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Product Price">
              <Form.Control
                type="productPrice"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
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
