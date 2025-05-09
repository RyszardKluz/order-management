import ClientsRepository from '../repositories/ClientsRepository.js';
import AppError from '../errors/AppError.js';

class ClientsService {
  getClients = async (searchValue) => {
    const clients = ClientsRepository.getClients();

    if (!searchValue) {
      return clients;
    }

    const matchedClients = clients.filter(
      (client) =>
        client.clientName.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.clientSurname
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        client.clientAddress.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (matchedClients.length === 0) {
      throw new AppError('No client found!', 404);
    }

    return matchedClients;
  };

  addClient = async (clientName, clientSurname, clientAddress) => {
    console.log(clientName, clientAddress, clientSurname);
    if (
      !clientName ||
      typeof clientName !== 'string' ||
      !clientSurname ||
      typeof clientSurname !== 'string'
    ) {
      throw new AppError('Invalid clients details', 400);
    }

    const newClient = ClientsRepository.addClient(
      clientName,
      clientSurname,
      clientAddress,
    );
    return newClient;
  };

  changeClient = async (clientId, clientName, clientSurname, clientAddress) => {
    if (!clientId && !clientName && !clientSurname && !clientAddress) {
      throw new AppError('Invalid details', 400);
    }

    const updatedClient = ClientsRepository.changeClient(
      clientId,
      clientName,
      clientSurname,
      clientAddress,
    );
    if (!updatedClient) {
      throw new AppError('Client not found', 404);
    }
    return updatedClient;
  };

  deleteClient = async (clientId) => {
    if (!clientId) {
      throw new AppError('Client not found', 404);
    }
    ClientsRepository.deleteClient(clientId);
    return;
  };
}

export default ClientsService;
