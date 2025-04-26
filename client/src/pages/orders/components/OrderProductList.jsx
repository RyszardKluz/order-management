import ListGroup from 'react-bootstrap/ListGroup';

function OrderProductList({ productList }) {
  return (
    <ListGroup as="ol" numbered>
      {productList.map((product, index) => {
        return (
          <ListGroup.Item
            as="li"
            key={product.id || index}
            title={`Price : ${product.productPrice} , Count :${product.productCount}`}
          >
            {product.productName}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default OrderProductList;
