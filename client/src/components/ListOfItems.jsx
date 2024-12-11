import { Table } from 'react-bootstrap';

const ListOfItems = ({ items, head1, head2, head3 }) => {
  console.log(items);
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
          <tr key={item.productId}>
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
