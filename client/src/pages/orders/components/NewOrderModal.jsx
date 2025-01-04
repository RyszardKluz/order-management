import { Accordion, Stack, Modal } from 'react-bootstrap';
import ClientOrderList from './ClientOrderList';

const newOrderModal = ({ isVisible, onClose }) => {
  return (
    <>
      {' '}
      <Modal 
      onShow={isVisible}
      onHide={onClose}>
        <Accordion defaultActiveKey="0">
          <Stack gap={5} className="col-md-10 mx-auto">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Clients</Accordion.Header>
              <Accordion.Body>
                <ClientOrderList />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Products</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Order Summary</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Stack>
        </Accordion>
      </Modal>
    </>
  );
};

export default newOrderModal;
