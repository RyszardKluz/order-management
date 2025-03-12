import { Accordion, Stack, Modal } from 'react-bootstrap';
import ResourceList from '../../../components/Lists/ResourceList';

import toggleActiveKey from '../../../helpers/toggleActiveKey';
import OrderDetailsForm from './OrderDetailsForm';

import { clientsOrdersHeadings } from '../../../config/clients/clientsFields';
import { productsOrdersHeadings } from '../../../config/products/productsFields';
import { useState } from 'react';

const NewOrderModal = ({ isVisible, onClose, clients, products }) => {
  const [activeKey, setActiveKey] = useState('0');

  const [selectedClients, setSelectedClients] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxClick = (resource, type, keyNumber) => {
    if (type === 'client') {
      setSelectedClients(resource);
    } else if (type === 'product') {
      setSelectedProducts((prev) => [...prev, resource]);
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
          onExit={onClose}
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
            <Accordion activeKey={activeKey} defaultActiveKey={0}>
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('0', activeKey, setActiveKey);
                  }}
                >
                  Clients
                </Accordion.Header>
                <Accordion.Body
                  style={{ maxHeight: '60vh', overflowY: 'auto' }}
                >
                  <ResourceList
                    columnHeadings={clientsOrdersHeadings}
                    resourceList={clients}
                    hasCheckButton={true}
                    onCheckboxClick={(resource) => {
                      handleCheckboxClick(resource, 'client', '1');
                    }}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('1', activeKey, setActiveKey);
                  }}
                >
                  Products
                </Accordion.Header>
                <Accordion.Body
                  style={{ maxHeight: '60vh', overflowY: 'auto' }}
                >
                  <ResourceList
                    columnHeadings={productsOrdersHeadings}
                    resourceList={products}
                    hasCountInput={true}
                    hasCheckButton={true}
                    onCheckboxClick={(resource) => {
                      handleCheckboxClick(resource, 'product');
                    }}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header
                  onClick={() => {
                    toggleActiveKey('2', activeKey, setActiveKey);
                  }}
                >
                  Order Summary
                </Accordion.Header>
                <Accordion.Body>
                  <OrderDetailsForm
                    products={selectedProducts}
                    client={selectedClients}
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
