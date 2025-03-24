import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewOrderModal from '../components/NewOrderModal';
import CustomButton from '../../../components/CustomButton';
import fetchResorce from '../../../helpers/fetchResource';
import { useToast } from '../../../hooks/useToast';

const OrdersPage = () => {
  const [state, setState] = useState({
    isButtonHidden: false,
    isCreateModalVisible: false,
    clients: [],
    products: [],
    selectedId: '',
    isLoading: false,
  });
  const { showToast, ToastComponent } = useToast();

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleHideCreateModal = () => {
    updateState({ isCreateModalVisible: false, isButtonHidden: false });
  };

  const handleshowCreateModal = async () => {
    updateState({ isLoading: true });

    try {
      await fetchResorce('/clients', 'clients', updateState);

      await fetchResorce('/products', 'products', updateState);

      updateState({ isCreateModalVisible: true, isButtonHidden: true });
    } catch (err) {
      showToast(
        'danger',
        'Error loading clients or products. Please try again.',
      );
    } finally {
      updateState({ isLoading: false });
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>{ToastComponent}</Col>
        </Row>
      </Container>

      <div id="newOrder">
        <NewOrderModal
          onShowToast={showToast}
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
              buttonClassName={'mb-3'}
              text={'Get orders details'}
              variantOption={'primary'}
            />
          </Col>
          <Col xs="auto">
            <CustomButton
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
