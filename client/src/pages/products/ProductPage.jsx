import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import ListOfProducts from './components/ListOfProducts';
import AddProductModal from './components/AddProductModal';
import SearchInput from '../../components/SearchInput';
import ChangeProductModal from './components/ChangeProductModal';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('');
  const [toastBody, setToastBody] = useState('');

  const handleAddModalClose = () => setAddModalVisible(false);
  const handleEditModalClose = () => setEditModalVisible(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products?query=${encodeURIComponent(searchValue)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (searchValue.toString().trim() === '') {
        throw new Error('Enter any value');
      }
      if (!response.ok) {
        setProducts([]);
        throw new Error('Failed to find an item');
      }

      const data = await response.json();
      setProducts(data);
      showSuccessToast('Successfully found an item');
    } catch (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  };

  const handleRowClick = (id) => {
    setEditModalVisible(true);
    setSelectedProductId(id);
  };
  const showErrorToast = (body) => {
    setToastVariant('danger');
    setToastBody(body);
    setShowToast(true);
  };
  const showSuccessToast = (body) => {
    setToastVariant('success');
    setToastBody(body);
    setShowToast(true);
  };
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <ToastContainer position="top-end" className="p-3">
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
                autohide
                bg={toastVariant}
              >
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                </Toast.Header>
                <Toast.Body>{toastBody}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
      <AddProductModal
        isVisible={isAddModalVisible}
        onClose={handleAddModalClose}
        fetchProducts={fetchProducts}
        onShowSuccessToast={showSuccessToast}
        onShowErrorToast={showErrorToast}
      />
      <ChangeProductModal
        productId={selectedProductId}
        isVisible={isEditModalVisible}
        onClose={handleEditModalClose}
        fetchProducts={fetchProducts}
        onShowSuccessToast={showSuccessToast}
        onShowErrorToast={showErrorToast}
      />
      <ListOfProducts
        onRowClick={handleRowClick}
        items={products}
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
              onClick={() => setAddModalVisible(true)}
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
