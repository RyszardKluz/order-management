import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ListOfItems from '../../components/ListOfItems';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  // Funkcja do pobierania produktów
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

  // Automatyczne pobranie przy pierwszym renderowaniu
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Button onClick={fetchItems} className="mb-3">
        Render Products
      </Button>
      <ListOfItems
        items={products}
        head1={'Product Id'}
        head2={'Product Name'}
        head3={'Product Price'}
      />
    </div>
  );
};

export default ProductPage;
