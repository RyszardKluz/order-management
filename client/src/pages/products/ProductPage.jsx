import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SearchInput from '../../components/SearchInput';
import { useToast } from '../../hooks/useToast.jsx';

import fetchResorce from '../../helpers/fetchResource.js';
import searchResource from '../../helpers/searchResource.js';
import AddResourceModal from '../../components/Modals/AddResourceModal.jsx';
import EditResourceModal from '../../components/Modals/EditResourceModal.jsx';

import ResourceList from '../../components/Lists/ResourceList.jsx';
import CustomButton from '../../components/CustomButton.jsx';
import {
  productsFields,
  productsHeaders,
} from '../../config/products/productsFields.js';

const ProductPage = () => {
  const [state, setState] = useState({
    products: [],
    isAddModalVisible: false,
    isEditModalVisible: false,
    selectedProductId: '',
  });

  const { showToast, ToastComponent } = useToast();

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState })); //do setState automatycznie React przekazuje poprzedni stan - prevState (w argumenvcie przekazywana funkcja)

  const handleAddModalClose = () => updateState({ isAddModalVisible: false });
  const handleEditModalClose = () => updateState({ isEditModalVisible: false });

  const fetchProducts = () => {
    fetchResorce('/products', 'products', setState, showToast);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (searchValue) => {
    searchResource(
      '/products',
      searchValue,
      updateState,
      showToast,
      'Product',
      'GET',
    );
  };

  const handleRowClick = (id) => {
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
        action={'Enter'}
        method={'POST'}
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

      <ResourceList
        columnHeadings={productsHeaders}
        onRowSelect={handleRowClick}
        resourceList={state.products}
      />
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
