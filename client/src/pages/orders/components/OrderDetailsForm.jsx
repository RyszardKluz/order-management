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
}) {
  const [state, setState] = useState({
    clientName: '',
    clientAddress: '',
    products: [],
  });

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (client && Object.keys(client).length > 0) {
      setState({
        clientName: client.clientName || '',
        clientAddress: client.clientAddress || '',
        clientId: client.clientId || '',
      });
    }
  }, [client]);

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
    );
  };
  const totalAmount = calculateAmount(products);
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
          <OrderProductDetails products={products} />
        </InputGroup>
        <FormLabel style={{ marginBottom: '15px' }}>Total amount</FormLabel>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            type="text"
            value={totalAmount}
            readOnly={true}
          />
          <CustomButton
            variantOption={'primary'}
            text={'Submit order'}
            type="submit"
            callback={() => {
              updateState({ products: products });
            }}
          />
        </InputGroup>
      </Form>
    </>
  );
}

export default OrderDetailsForm;
