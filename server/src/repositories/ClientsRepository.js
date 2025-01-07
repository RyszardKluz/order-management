import { v4 as uuidv4 } from 'uuid';
import Client from '../../models/client.js';

class ClientsRepository {
  static clients = [
    {
      clientId: '2fbf70b5-2b67-448c-97e1-9a33dcd8de27',
      clientName: 'Client1',
      clientSurname: 'Surname1',
      clientAddress: 'Address1',
    },
    {
      clientId: '4bb7ca3d-070e-4be1-a4a1-d63c79fbce65',
      clientName: 'Client2',
      clientSurname: 'Surname2',
      clientAddress: 'Address2',
    },
  ];

  static getClients = () => {
    return this.clients;
  };

  static addClient = (clientName, clientSurname, clientAddress) => {
    const newClient = new Client(
      uuidv4(),
      clientName,
      clientAddress,
      clientSurname,
    );

    this.clients.push(newClient);

    return newClient;
  };
  static changeClient = (
    clientId,
    clientName,
    clientSurname,
    clientAddress,
  ) => {
    const clientIndex = this.clients.findIndex(
      (client) => client.clientId === clientId,
    );

    if (clientName.trim() !== '') {
      this.clients[clientIndex].clientName = clientName;
    }
    if (clientSurname.trim() !== '') {
      this.clients[clientIndex].clientSurname = clientSurname;
    }
    if (clientAddress.trim() !== '') {
      this.clients[clientIndex].clientAddress = clientAddress;
    }
    if (clientIndex === -1) {
      return null;
    }
    return this.clients[clientIndex];
  };

  static deleteClient = (clientId) => {
    const clientIndex = this.clients.findIndex(
      (client) => client.clientId === clientId,
    );

    if (clientIndex === -1) {
      return null;
    }
    this.clients.splice(clientIndex, 1);
  };
}

export default ClientsRepository;
