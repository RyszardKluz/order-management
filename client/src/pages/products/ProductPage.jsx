import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ListOfItems from '../../components/ListOfItems';
import AddProductModal from './components/AddProductModal';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchItems = async () => {
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
    fetchItems();
  }, []);

  return (
    <>
      <AddProductModal isVisible={show} close={handleClose} show={handleShow} />

      <ListOfItems
        items={products}
        head1={'Product Id'}
        head2={'Product Name'}
        head3={'Product Price'}
      />

      <Container>
        <Row>
          <Col>
            <Button onClick={fetchItems} className="mb-3">
              Render Products
            </Button>
          </Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>
            <Button className="mb-3" onClick={handleShow}>
              Add new Product
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
