import ListGroup from 'react-bootstrap/ListGroup';
import { Product } from '../../../types/resource';

type Props = {
  productList: Product[];
};

function OrderProductList({ productList }: Props) {
  return (
    <ListGroup as="ol" numbered>
      {productList.map((product, index) => {
        return (
          <ListGroup.Item
            as="li"
            key={product.id || index}
            title={`Price : ${product.price} , Count :${product.productCount}`}
          >
            {product.title}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default OrderProductList;
