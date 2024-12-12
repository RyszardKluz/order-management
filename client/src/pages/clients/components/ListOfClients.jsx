import { Table } from 'react-bootstrap';

const ListOfClients = ({ items, head1, head2, head3, handleRowClick }) => {
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
            key={item.clientId}
            onClick={() => {
              onRowClick(item.clientId);
            }}
          >
            <td>{index + 1}</td>
            <td>{item.clientId}</td>
            <td>{item.clientName}</td>
            <td>{item.clientSurname}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListOfClients;
