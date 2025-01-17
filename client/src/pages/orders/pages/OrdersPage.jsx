import { Button, Container, Row, Col } from 'react-bootstrap';
import NewOrderModal from '../components/NewOrderModal';

const OrdersPage = () => {
  return (
    <>
      <div id="newOrder">
        <NewOrderModal />
      </div>
      <Container className="mt-3">
        <Row
          className="d-flex justify-content-center align-items-center mt-5"
          style={{ gap: '100px', minHeight: '15rem' }}
        >
          <Col xs="auto">
            <Button className="mb-3">Create Order</Button>
          </Col>
          <Col xs="auto">
            <Button className="mb-3">Get Orders</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrdersPage;
