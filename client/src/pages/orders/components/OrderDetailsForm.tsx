import { Form, FormLabel, InputGroup } from 'react-bootstrap';
import OrderProductDetails from './OrderProductDetails';
import { FormEvent, useEffect, useState } from 'react';
import calculateAmount from '../utils/calculateTotalAmount';
import CustomButton from '../../../components/CustomButton';
import submitHandler from '../../../helpers/submitHandler';
import {
  OrderProduct,
  ClientFromDatabase,
  Order,
} from '../../../types/resource';
import { ShowToastFunction } from '../../../types/toast';
import { ResourceProvider } from '../../../store/ResourceLContext';

type Props = {
  products: OrderProduct[];
  client: ClientFromDatabase | null;
  onClose: () => void;
  onResetFormFields: () => void;
  onShowToast: ShowToastFunction;
};

interface IState {
  clientId: string;
  clientName: string;
  clientAddress: string;
  products: OrderProduct[];
  totalPrice: number;
  [key: string]: unknown;
}
function OrderDetailsForm({
  products,
  client,
  onClose,
  onResetFormFields,
  onShowToast,
}: Props) {
  const [state, setState] = useState<IState>({
    clientName: '',
    clientAddress: '',
    products: [],
    totalPrice: 0,
    clientId: '',
  });
  const updateState = (newState: Record<string, unknown>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (client && Object.keys(client).length > 0) {
      updateState({
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (client && Object.keys(client).length === 0) {
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

  const handleUpdateProductCount = (id: string, value: number) => {
    const updatedProducts = state.products.map((product: OrderProduct) =>
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
          <ResourceProvider<OrderProduct>
            value={{
              columnHeadings: ['Product', 'ProductPrice', 'Count'],
              resourceList: products,
              isOrderDetailsList: true,
              onProductCountChange: handleUpdateProductCount,
              hasCountInput: true,
            }}
          >
            <OrderProductDetails />
          </ResourceProvider>
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
