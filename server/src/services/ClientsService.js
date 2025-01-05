import ClientsRepository from "../repositories/ClientsRepository";
import Client from '../../models/client.js';
import AppError from "../errors/AppError.js";

class ClientsService {
  constructor() {
    this.clients = ClientsRepository.getClients()
  }

  getClients = async (searchValue) => {



    if (!searchValue) {
      return this.clients;
    }

    const matchedClients = this.clients.filter((client) =>
      client.clientName.toLowerCase().includes(searchValue.toLowerCase()) || client.clientSurname.toLowerCase().includes(searchValue.toLowerCase()) || client.clientAddress.toLowerCase().includes(searchValue.toLowerCase()))
      ;

    if (matchedClients.length === 0) {
      throw new AppError('No client found!', 400);
    }

    return matchedClients
  }

  addClient = async ({ clientName, clientSurname, clientAddress }) => {

    if (!clientName || typeof clientName !== 'string' || !clientSurname || typeof clientSurname !== 'string') {
      throw new AppError('Invalid clients details', 404)
    }


    const newClient = ClientsRepository.addClient(clientName, clientSurname, clientAddress);
    return newClient
  };

  changeClient = async (clientId, clientName, clientSurname, clientAddress) => {
    if (!clientId && !clientName && !clientSurname && !clientAddress) {
      throw new AppError('Invalid details', 400)
    }

    const updatedClient = ClientsRepository.changeClient(clientId, clientName, clientSurname, clientAddress);
    if (!updatedClient) {
      throw new AppError('Client not found', 404)
    }
    return updatedClient
  };

  deleteClient = async (clientId) => {
    if (!clientId) {
      throw new AppError('Client not found', 404)
    }
    ClientsRepository.deleteClient(clientId)
    return;
  }


};

export default ClientsService; 