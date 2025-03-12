import { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import NewOrderModal from '../components/NewOrderModal';
import CustomButton from '../../../components/CustomButton';
import fetchResorce from '../../../helpers/fetchResource';

const OrdersPage = () => {
  const [state, setState] = useState({
    isButtonHidden: false,
    isCreateModalVisible: false,
    clients: [],
    products: [],
    selectedId: '',
  });

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleHideCreateModal = () => {
    updateState({ isCreateModalVisible: false, isButtonHidden: false });
  };
  const handleshowCreateModal = () => {
    fetchResorce('/clients', 'clients', updateState);
    fetchResorce('/products', 'products', updateState);
    updateState({ isCreateModalVisible: true, isButtonHidden: true });
  };

  return (
    <>
      <div id="newOrder">
        <NewOrderModal
          isVisible={state.isCreateModalVisible}
          onClose={handleHideCreateModal}
          clients={state.clients}
          products={state.products}
        />
      </div>
      <Container className="mt-3">
        <Row
          className="d-flex justify-content-center align-items-center mt-5"
          style={{ gap: '100px', minHeight: '15rem' }}
        >
          <Col xs="auto">
            <CustomButton
              isButtonHidden={state.isButtonHidden}
              buttonClassName={'mb-3'}
              text={'Get orders details'}
              variantOption={'primary'}
            />
          </Col>
          <Col xs="auto">
            <CustomButton
              isButtonHidden={state.isButtonHidden}
              buttonClassName={'mb-3'}
              text={'Create order'}
              variantOption={'dark'}
              callback={handleshowCreateModal}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrdersPage;
