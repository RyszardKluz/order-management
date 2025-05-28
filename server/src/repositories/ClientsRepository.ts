import AppError from '../errors/AppError';
import Client, { ClientModel } from '../models/Client';
import { Op } from 'sequelize';

class ClientsRepository {
  static filterClients = async (query: string): Promise<ClientModel[]> => {
    try {
      const keys = Object.keys(Client.getAttributes());

      const keysWithoutId = keys.filter((key) => key !== 'id');

      const conditions = keysWithoutId.map((key) => ({
        [key]: { [Op.like]: `%${query}%` },
      }));

      const clients = await Client.findAll({
        where: { [Op.or]: conditions },
        attributes: ['id', 'first_name', 'last_name', 'address'],
      });
      if (!clients || clients.length === 0) {
        throw new AppError('Failed to find client by this query', 404);
      }
      return clients;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static getClients = async () => {
    try {
      const clients = await Client.findAll({
        attributes: ['id', 'first_name', 'last_name', 'address'],
      });

      if (!clients) {
        throw new AppError('Failed to fetch clients!', 404);
      }
      return clients;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static addClient = async (
    clientName: string,
    clientSurname: string,
    clientAddress: string,
  ): Promise<ClientModel> => {
    try {
      const newClient = await Client.create({
        first_name: clientName,
        last_name: clientSurname,
        address: clientAddress,
      });
      if (!newClient) {
        throw new AppError('Failed to create client!', 400);
      }
      return newClient;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };
  static changeClient = async (
    clientId: string,
    clientName: string,
    clientSurname: string,
    clientAddress: string,
  ) => {
    try {
      const client = await Client.findByPk(clientId);
      if (!client) return;
      if (clientName.trim() !== '') {
        client.first_name = clientName;
      }
      if (clientSurname.trim() !== '') {
        client.last_name = clientSurname;
      }
      if (clientAddress.trim() !== '') {
        client.address = clientAddress;
      }

      const updatedClient = await client.save();

      if (!updatedClient) {
        throw new AppError('Failed to update a client!', 400);
      }

      return updatedClient;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static deleteClient = (clientId: string): void => {
    try {
      Client.destroy({ where: { id: clientId } });
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };
}

export default ClientsRepository;
