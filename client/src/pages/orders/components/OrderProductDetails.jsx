import ResourceList from '../../../components/Lists/ResourceList';
const OrderProductDetails = ({ products }) => {
  return (
    <ResourceList
      columnHeadings={['Product', 'ProductPrice', 'Count']}
      resourceList={products}
      isOrderDetailsList={true}
      hasCountInput={true}
    />
  );
};

export default OrderProductDetails;
