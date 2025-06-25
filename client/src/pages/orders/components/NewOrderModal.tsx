import { Accordion, Stack, Modal } from 'react-bootstrap';
import ResourceList from '../../../components/Lists/ResourceList';

import toggleActiveKey from '../../../helpers/toggleActiveKey';
import OrderDetailsForm from './OrderDetailsForm';

import { clientsOrdersHeadings } from '../../../config/clients/clientsFields';
import { useState } from 'react';
import { Client, OrderProduct, Product } from '../../../types/resource';
import { ShowToastFunction } from '../../../types/toast';
import { ResourceProvider } from '../../../store/ResourceLContext';
import { productsOrdersHeadings } from '../../../config/products/productsFields';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  clients: Client[];
  products: OrderProduct[];
  onShowToast: ShowToastFunction;
};
const NewOrderModal = ({
  isVisible,
  onClose,
  clients,
  products,
  onShowToast,
}: Props) => {
  const [activeKey, setActiveKey] = useState<string | null>('0');

  const [selectedClients, setSelectedClients] = useState<Client | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);

  const handleResetFormFields = () => {
    setSelectedClients(null);
    setSelectedProducts([]);
  };

  const handleCheckboxClick = (
    resource: Product | Client,
    type: string,
    keyNumber?: string,
  ) => {
    if (type === 'client') {
      setSelectedClients(resource as Client);
    } else if (type === 'product') {
      setSelectedProducts((prev) => [...prev, resource as OrderProduct]);
    }
    if (keyNumber) {
      setActiveKey(`${keyNumber}`);
    }
  };

  return (
    <>
      <Stack gap={5} className="col-md-10 mx-auto">
        <Modal
          size="lg"
          onExit={() => {
            onClose();
            handleResetFormFields();
          }}
          scrollable={true}
          backdrop="static"
          show={isVisible}
          onHide={onClose}
          style={{
            top: '20px',
            overflow: 'auto',
            marginTop: '6rem auto',
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Order details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Accordion activeKey={activeKey} defaultActiveKey={'0'}>
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('0', activeKey as string, setActiveKey);
                  }}
                >
                  Clients
                </Accordion.Header>
                <Accordion.Body
                  style={{ maxHeight: '60vh', overflowY: 'auto' }}
                >
                  <ResourceProvider<Client>
                    value={{
                      resourceList: clients,
                      hasCheckButton: true,
                      columnHeadings: clientsOrdersHeadings,
                      isOrderDetailsList: false,
                      onCheckboxClick: handleCheckboxClick,
                    }}
                  >
                    <ResourceList<Client> />
                  </ResourceProvider>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('1', activeKey as string, setActiveKey);
                  }}
                >
                  Products
                </Accordion.Header>
                <Accordion.Body
                  style={{ maxHeight: '60vh', overflowY: 'auto' }}
                >
                  <ResourceProvider<Product>
                    value={{
                      resourceList: products,
                      columnHeadings: productsOrdersHeadings,
                      isOrderDetailsList: false,
                      hasCountInput: true,
                      hasCheckButton: true,
                      onCheckboxClick: handleCheckboxClick,
                    }}
                  >
                    <ResourceList<Product> />
                  </ResourceProvider>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('2', activeKey as string, setActiveKey);
                  }}
                >
                  Order Summary
                </Accordion.Header>
                <Accordion.Body>
                  <OrderDetailsForm
                    onShowToast={onShowToast}
                    onResetFormFields={handleResetFormFields}
                    products={selectedProducts}
                    client={selectedClients}
                    onClose={onClose}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Modal.Body>
        </Modal>
      </Stack>
    </>
  );
};

export default NewOrderModal;
