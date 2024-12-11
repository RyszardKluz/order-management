import { useState } from 'react';
import FormModal from '../../components/FormModal';

const AddProduct = () => {
  const [show, setShow] = useState(false);

  const addProductToDatabase = async (data) => {
    console.log(data)
    try {
      const response = await fetch(
        'http://localhost:5000/products/add-product',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (formData) => {
    addProductToDatabase(formData);

    handleClose();
  };
  return (
    <FormModal
      defaultShow={show}
      onClose={handleClose}
      onShow={handleShow}
      onSubmit={handleFormSubmit}
    />
  );
};

export default AddProduct;
