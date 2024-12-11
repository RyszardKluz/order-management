import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const AddProductModal = ({ isVisible, close }) => {
  const [productPrice, setProductPrice] = useState('');
  const [productName, setProductName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = {
      productName: productName,
      productPrice: productPrice,
    };
    try {
      const response = await fetch(
        'http://localhost:5000/products/add-product',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={isVisible} onHide={close}>
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
