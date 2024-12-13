import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

const ChangeProductModal = ({
  isVisible,
  onClose,
  productId,
  onShowSuccessToast,
  onShowErrorToast,
  fetchProducts,
}) => {
  const [productPrice, setProductPrice] = useState('');
  const [productName, setProductName] = useState('');

  const resetFormFields = () => {
    setProductName('');
    setProductPrice('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = {
      productName: productName,
      productPrice: productPrice,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      if (productPrice.trim() === '' && productName.trim() === '') {
        throw new Error('At lest one field required');
      }
      onShowSuccessToast('Updated product information');
      onClose();
      setProductName('');
      setProductPrice('');
      fetchProducts();
      resetFormFields();
    } catch (error) {
      onShowErrorToast(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      onClose();
      fetchProducts();
      onShowSuccessToast('Successfully deleted product');
    } catch (error) {
      onShowErrorToast(error.message);
    }
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
            <Modal.Title>Edit product details</Modal.Title>
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
