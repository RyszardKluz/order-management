import { Form, FormLabel, InputGroup } from 'react-bootstrap';
import OrderProductDetails from './OrderProductDetails';
import { useEffect, useState } from 'react';
import calculateAmount from '../utils/calculateTotalAmount';
function OrderDetailsForm({ products, client }) {
  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    clientAddress: '',
  });

  useEffect(() => {
    if (client && Object.keys(client).length > 0) {
      setClientDetails({
        clientName: client.clientName || '',
        clientAddress: client.clientAddress || '',
      });
    }
  }, [client]);

  calculateAmount(products);
  return (
    <>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="client-name">Client</InputGroup.Text>
          <Form.Control
            defaultValue={clientDetails.clientName}
            placeholder="Client name"
            aria-label="Username"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="client-address">Address</InputGroup.Text>
          <Form.Control
            defaultValue={clientDetails.clientAddress}
            placeholder="Client address"
            aria-label="Recipient's username"
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
            type="number"
          />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
      </Form>
    </>
  );
}

export default OrderDetailsForm;
