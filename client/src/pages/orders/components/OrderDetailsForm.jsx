import { Form, FormLabel, InputGroup } from 'react-bootstrap';
import OrderProductDetails from './OrderProductDetails';
import { useEffect, useState } from 'react';
import calculateAmount from '../utils/calculateTotalAmount';
import CustomButton from '../../../components/CustomButton';
import submitHandler from '../../../helpers/submitHandler';

function OrderDetailsForm({
  products,
  client,
  onClose,
  onResetFormFields,
  onShowToast,
  onGetOrderDetails,
}) {
  const [state, setState] = useState({
    clientName: '',
    clientAddress: '',
    products: [],
    totalPrice: 0,
  });
  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (client && Object.keys(client).length > 0) {
      setState({
        clientName: client.first_name || '',
        clientAddress: client.address || '',
        clientId: client.id || '',
      });
    }
  }, [client]);

  useEffect(() => {
    if (products && products.length > 0) {
      setState((prevState) => ({ ...prevState, products }));
    }
  }, [products]);

  useEffect(() => {
    if (state.products && state.products.length > 0) {
      const totalAmount = calculateAmount(state.products);
      updateState({ totalPrice: totalAmount });
    }
  }, [state.products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(client).length === 0) {
      onShowToast('danger', 'Please select a client.');
      return;
    }

    if (products.length === 0) {
      onShowToast('danger', 'Please select at least one product.');
      return;
    }

    submitHandler(
      e,
      '/orders',
      'POST',
      state,
      null,
      'Order',
      onShowToast,
      onClose,
      null,
      onResetFormFields,
      onGetOrderDetails,
    );
  };

  const handleUpdateProductCount = (id, value) => {
    const updatedProducts = state.products.map((product) =>
      product.productId === id ? { ...product, productCount: value } : product,
    );

    updateState({ products: updatedProducts });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Client details</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="client-name">Client</InputGroup.Text>
          <Form.Control
            defaultValue={state.clientName}
            placeholder="Client name"
            aria-label="Username"
            onChange={(e) => {
              updateState({ clientName: e.currentTarget.value });
            }}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="client-address">Address</InputGroup.Text>
          <Form.Control
            defaultValue={state.clientAddress}
            placeholder="Client address"
            aria-label="Recipient's username"
            onChange={(e) => {
              updateState({ clientAddress: e.currentTarget.value });
            }}
          />
        </InputGroup>

        <Form.Label>Order details</Form.Label>
        <InputGroup className="mb-3">
          <OrderProductDetails
            products={products}
            onProductCountChange={handleUpdateProductCount}
          />
        </InputGroup>
        <FormLabel style={{ marginBottom: '15px' }}>Total amount</FormLabel>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            type="text"
            value={state.totalPrice}
            readOnly={true}
          />
          <CustomButton
            variantOption={'primary'}
            text={'Submit order'}
            type="submit"
          />
        </InputGroup>
      </Form>
    </>
  );
}

export default OrderDetailsForm;
