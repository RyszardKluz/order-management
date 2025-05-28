import ResourceList from '../../../components/Lists/ResourceList';
const OrderProductDetails = ({ products, onProductCountChange }) => {
  return (
    <ResourceList
      columnHeadings={['Product', 'ProductPrice', 'Count']}
      resourceList={products}
      isOrderDetailsList={true}
      hasCountInput={true}
      onProductCountChange={onProductCountChange}
    />
  );
};

export default OrderProductDetails;
