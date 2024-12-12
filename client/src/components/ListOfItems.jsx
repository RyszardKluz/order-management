import { Table } from 'react-bootstrap';

const ListOfItems = ({ items, head1, head2, head3, handleRowClick }) => {
  const onRowClick = (id) => {
    handleRowClick(id);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{head1}</th>
          <th>{head2}</th>
          <th>{head3}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.productId}
            onClick={() => {
              onRowClick(item.productId);
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

export default ListOfItems;
