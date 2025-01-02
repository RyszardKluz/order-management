import { Table } from 'react-bootstrap';

const ClientList = ({ clients, columnHeadings, onRowSelect }) => {
  const handleRowClick = (clientId) => {
    onRowSelect(clientId);
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
        {clients.map((client, index) => (
          <tr
            key={client.clientId}
            onClick={() => handleRowClick(client.clientId)}
          >
            <td>{index + 1}</td>
            <td>{client.clientId}</td>
            <td>{client.clientName}</td>
            <td>{client.clientSurname}</td>
            <td>{client.clientAddress}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientList;
