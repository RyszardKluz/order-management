import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SearchInput from '../../components/SearchInput';
import { useToast } from '../../hooks/useToast';

import fetchResorce from '../../helpers/fetchResource.js';
import searchResource from '../../helpers/searchResource.js';
import AddResourceModal from '../../components/Modals/AddResourceModal';
import EditResourceModal from '../../components/Modals/EditResourceModal';

import ResourceList from '../../components/Lists/ResourceList';
import CustomButton from '../../components/CustomButton';
import {
  productsFields,
  productsHeaders,
} from '../../config/products/productsFields.js';
import { OrderProduct, Product } from '../../types/resource';
import { ResourceProvider } from '../../store/ResourceLContext';

const ProductPage = () => {
  const [state, setState] = useState({
    products: [],
    isAddModalVisible: false,
    isEditModalVisible: false,
    selectedProductId: '',
  });

  const { showToast, ToastComponent } = useToast();

  const updateState = (newState: Record<string, unknown>) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleAddModalClose = () => updateState({ isAddModalVisible: false });
  const handleEditModalClose = () => updateState({ isEditModalVisible: false });

  const fetchProducts = async () => {
    const products = await fetchResorce('/products', 'products', showToast);
    updateState({ products: products });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (searchValue: string) => {
    try {
      const data = await searchResource(
        '/products',
        searchValue,
        showToast,
        'Product',
        'GET',
      );
      updateState({ products: data });
    } catch (error) {
      showToast('danger', (error as Error).message);
      updateState({ products: [] });
    }
  };

  const handleRowClick = (product: Product) => {
    const id = product.id;
    updateState({ isEditModalVisible: true, selectedProductId: id });
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>{ToastComponent}</Col>
        </Row>
      </Container>
      <AddResourceModal
        isVisible={state.isAddModalVisible}
        fields={productsFields}
        resourceName={'Product'}
        endpoint={'/products'}
        onClose={handleAddModalClose}
        onSubmitSuccess={fetchProducts}
        onShowToast={showToast}
      />

      <EditResourceModal
        fields={productsFields}
        endpoint={'/products'}
        resourceName={'Product'}
        resourceId={state.selectedProductId}
        isVisible={state.isEditModalVisible}
        onClose={handleEditModalClose}
        onSubmitSuccess={fetchProducts}
        onShowToast={showToast}
      />
      <ResourceProvider<OrderProduct>
        value={{
          resourceList: state.products,
          onRowSelect: handleRowClick,
          columnHeadings: productsHeaders,
          isOrderDetailsList: false,
          onShowToast: showToast,
        }}
      >
        <ResourceList<Product> />
      </ResourceProvider>

      <Container>
        <Row>
          <Col>
            <CustomButton
              text={'Render Products'}
              variantOption={'primary'}
              callback={fetchProducts}
            />
          </Col>
          <Col xs={8}>
            <SearchInput
              formText="Look for products by ID, or product Name"
              type="productId/productName"
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <CustomButton
              text={'Create Product'}
              variantOption={'primary'}
              callback={() => updateState({ isAddModalVisible: true })}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
