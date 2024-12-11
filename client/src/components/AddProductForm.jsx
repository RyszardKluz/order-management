import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function AddProductForm({ onCancel, onSubmit }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!productName ||typeof price !== 'number'){
      alert('Wrong product details, must have name and price ')
    }
    onSubmit({ productName, price });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Form.Floating className="mb-3">
          <Form.Control
            value={productName}
            id="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
          <label>Product Name</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            value={price}
            id="price"
            onChange={(e) => setPrice(+e.target.value)}
          />
          <label>Product Price</label>
        </Form.Floating>
        <Form.Floating className="mb-4">
          <div className="d-flex gap-3 mt-3">
            <Button variant="secondary" onClick={onCancel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add new Product
            </Button>
          </div>
        </Form.Floating>
      </form>
    </>
  );
}

export default AddProductForm;
