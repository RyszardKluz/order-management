import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ListOfItems from '../../components/ListOfItems';
import AddProductModal from './components/AddProductModal';
import SearchInput from '../../components/SearchInput';
import ChangeProductModal from './components/ChangeProductModal';
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/products/get-all-products',
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (searchValue) => {
    const response = await fetch(
      `http://localhost:5000/products/get-product?query=${encodeURIComponent(searchValue)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const data = await response.json();
    setProducts(data);
  };

  const handleRowClick = (id) => {
    setShow(true);
    setProductId(id);
  };
  return (
    <>
      <AddProductModal isVisible={show} close={handleClose} show={handleShow} />
      <ChangeProductModal
        productId={productId}
        isVisible={show}
        close={handleClose}
        show={handleShow}
      />
      <ListOfItems
        handleRowClick={handleRowClick}
        items={products}
        head1={'Product Id'}
        head2={'Product Name'}
        head3={'Product Price'}
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
              formText={'Look for products by ID, or product Name'}
              type={'productId/productName'}
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <Button className="mb-3 mt-4" onClick={handleShow}>
              Add new Product
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
