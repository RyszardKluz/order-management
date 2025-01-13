import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import ListOfProducts from './components/ListOfProducts';
import AddProductModal from './components/AddProductModal';
import SearchInput from '../../components/SearchInput';
import ChangeProductModal from './components/ChangeProductModal';
import { useToast } from '../../hooks/useToast.jsx';
import fetchResorce from '../../helpers/fetchResource.js';
import searchResource from '../../helpers/searchResource.js';

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
      <AddProductModal
        isVisible={state.isAddModalVisible}
        onClose={handleAddModalClose}
        fetchProducts={fetchProducts}
        onShowToast={showToast}
      />
      <ChangeProductModal
        productId={state.selectedProductId}
        isVisible={state.isEditModalVisible}
        onClose={handleEditModalClose}
        fetchProducts={fetchProducts}
        onShowToast={showToast}
      />
      <ListOfProducts
        onRowClick={handleRowClick}
        items={state.products}
        columnHeadings={['Product Id', 'Product Name', 'Product Price']}
      />
      <Container>
        <Row>
          <Col>
            <Button onClick={fetchProducts} className="mb-3 mt-4">
              Render Products
            </Button>
          </Col>
          <Col xs={8}>
            <SearchInput
              formText="Look for products by ID, or product Name"
              type="productId/productName"
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <Button
              className="mb-3 mt-4"
              onClick={() => updateState({ isAddModalVisible: true })}
            >
              Add new Product
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
