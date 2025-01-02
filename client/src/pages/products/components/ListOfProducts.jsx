import { Table } from 'react-bootstrap';

const ListOfProducts = ({ items, columnHeadings, onRowClick }) => {
  const handleRowClick = (id) => {
    onRowClick(id);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {columnHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.productId}
            onClick={() => {
              handleRowClick(item.productId);
            }}
          >
            <td>{index + 1}</td>
            <td>{item.productId}</td>
            <td>{item.productName}</td>
            <td>{item.productPrice}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListOfProducts;
