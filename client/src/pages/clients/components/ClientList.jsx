import { Table } from 'react-bootstrap';

import Checkbox from '../../../components/Checkbox';

const ClientList = ({
  clients,
  columnHeadings,
  onRowSelect,
  hasCheckButton,
}) => {
  const handleRowClick = (clientId) => {
    onRowSelect(clientId);
  };
  console.log(clients);
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
            onClick={
              hasCheckButton ? undefined : () => handleRowClick(client.clientId)
            }
          >
            <td>{index + 1}</td>
            <td>{client.clientId}</td>
            <td>{client.clientName}</td>
            <td>{client.clientSurname}</td>
            <td>{client.clientAddress}</td>
            {hasCheckButton ? (
              <td>
                <Checkbox handleClick={handleRowClick} />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientList;
