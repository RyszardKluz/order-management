import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewOrderModal from '../components/NewOrderModal';
import CustomButton from '../../../components/CustomButton';
import fetchResorce from '../../../helpers/fetchResource';
import { useToast } from '../../../hooks/useToast';
import ResourceList from '../../../components/Lists/ResourceList';
import { ordersHeadeings } from '../../../config/orders/ordersFields';
import OrderProductList from '../components/OrderProductList';

const OrdersPage = () => {
  const [state, setState] = useState({
    isButtonHidden: false,
    isCreateModalVisible: false,
    clients: [],
    products: [],
    orders: [],
    filteredOrders: [],
    selectedId: '',
    isLoading: false,
  });

  const { showToast, ToastComponent } = useToast();

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleHideCreateModal = () => {
    updateState({ isCreateModalVisible: false, isButtonHidden: false });
  };

  const handleGetOrdersDetails = async () => {
    const orders = await fetchResorce(
      '/orders',
      'orders',
      updateState,
      showToast,
    );
    if (orders && orders.length > 0) {
      updateState({ orders });
      handleFilterOrdersList(orders);
    }
  };

  const handleFilterOrdersList = (orders) => {
    if (!orders || orders.length === 0) {
      return;
    }

    const orderList = state.orders.map((order) => ({
      orderId: order.id,
      clientName: order.clientName,
      clientAddress: order.clientAddress,
      products: <OrderProductList productList={order.products} />,
      totalPrice: order.totalPrice,
    }));

    updateState({ filteredOrders: orderList });
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

      <ResourceList
        isOrderList={true}
        columnHeadings={ordersHeadeings}
        resourceList={state.filteredOrders ? state.filteredOrders : []}
      />
      <div id="newOrder">
        <NewOrderModal
          onShowToast={showToast}
          isVisible={state.isCreateModalVisible}
          onClose={handleHideCreateModal}
          clients={state.clients}
          products={state.products}
          onGetOrderDetails={handleGetOrdersDetails}
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
              callback={handleGetOrdersDetails}
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
