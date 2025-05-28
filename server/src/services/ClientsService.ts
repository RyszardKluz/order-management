import ClientsRepository from '../repositories/ClientsRepository';
import AppError from '../errors/AppError';
import { ClientModel } from '../models/Client';

class ClientsService {
  getClients = async (searchValue: string): Promise<ClientModel[]> => {
    if (!searchValue) {
      const clients = await ClientsRepository.getClients();

      return clients;
    } else {
      const filteredClients = ClientsRepository.filterClients(searchValue);

      return filteredClients;
    }
  };

  addClient = async (
    clientName: string,
    clientSurname: string,
    clientAddress: string,
  ): Promise<ClientModel> => {
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

  changeClient = async (
    clientId: string,
    clientName: string,
    clientSurname: string,
    clientAddress: string,
  ): Promise<ClientModel> => {
    if (!clientId && !clientName && !clientSurname && !clientAddress) {
      throw new AppError('Invalid details', 400);
    }

    const updatedClient = await ClientsRepository.changeClient(
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

  deleteClient = async (clientId: string) => {
    if (!clientId) {
      throw new AppError('Client not found', 404);
    }
    ClientsRepository.deleteClient(clientId);
    return;
  };
}

export default ClientsService;
