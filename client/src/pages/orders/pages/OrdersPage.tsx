import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewOrderModal from '../components/NewOrderModal';
import CustomButton from '../../../components/CustomButton';
import fetchResorce from '../../../helpers/fetchResource';
import { useToast } from '../../../hooks/useToast';
import ResourceList from '../../../components/Lists/ResourceList';
import { ordersHeadeings } from '../../../config/orders/ordersFields';
import OrderProductList from '../components/OrderProductList';
import { Order } from '../../../types/resource';
import { ResourceProvider } from '../../../store/ResourceLContext';
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

  const updateState = (newState: Record<string, unknown>) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleHideCreateModal = () => {
    updateState({ isCreateModalVisible: false, isButtonHidden: false });
  };

  const handleGetOrdersDetails = async (): Promise<void> => {
    const orders = await fetchResorce<Order>('/orders', 'orders', showToast);
    if (orders && orders.length > 0) {
      updateState({ orders: orders });
      handleFilterOrdersList(orders);
    }
  };

  const handleFilterOrdersList = (orders: Order[]) => {
    if (!orders || orders.length === 0) {
      return;
    }

    const orderList = state.orders.map((order: Order) => ({
      orderId: order.id,
      clientName: order.clientName,
      clientAddress: order.clientAddress,
      products: <OrderProductList productList={order.products} />,
      totalPrice: order.totalPrice,
    }));

    updateState({ filteredOrders: orderList });
  };

  const handleshowCreateModal = async (): Promise<void> => {
    updateState({ isLoading: true });

    try {
      const clients = await fetchResorce('/clients', 'clients', useToast);

      const products = await fetchResorce('/products', 'products', useToast);

      updateState({
        isCreateModalVisible: true,
        products: products,
        clients: clients,
        isButtonHidden: true,
      });
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

      <ResourceProvider<Order>
        value={{
          resourceList: state.filteredOrders ? state.filteredOrders : [],
          columnHeadings: ordersHeadeings,
          isOrderDetailsList: false,
          isOrderList: true,
          onShowToast: showToast,
        }}
      >
        <ResourceList<Order> />
      </ResourceProvider>

      <div id="newOrder">
        <NewOrderModal
          onShowToast={showToast}
          isVisible={state.isCreateModalVisible}
          onClose={handleHideCreateModal}
          clients={state.clients}
          products={state.products}
          // onGetOrderDetails={handleGetOrdersDetails}
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
