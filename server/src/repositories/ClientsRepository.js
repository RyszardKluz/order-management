import Client from '../models/client.js'
import { Op } from 'sequelize'
class ClientsRepository {

  static filterClients = async (query) => {

    const keys = Object.keys(Client.getAttributes())

    const conditions = keys.map((key) => ({ [key]: { [Op.like]: `%${query}%` } }))

    const clients = await Client.findAll({
      where: { [Op.or]: conditions },
      attributes: ['id', 'first_name', 'last_name', 'address']

    })

    return clients
  }

  static getClients = async () => {
    const clients = await Client.findAll({
      attributes: ['id', 'first_name', 'last_name', 'address']
    })


    return clients;
  };

  static addClient = async (clientName, clientSurname, clientAddress) => {
    const newClient = await Client.create({
      first_name: clientName,
      last_name: clientSurname,
      address: clientAddress,
    })
    return newClient;
  };
  static changeClient = async (
    clientId,
    clientName,
    clientSurname,
    clientAddress,
  ) => {
    const client = await Client.findByPk(clientId);

    if (clientName.trim() !== '') {
      client.first_name = clientName;
    }
    if (clientSurname.trim() !== '') {
      client.last_name = clientSurname;
    }
    if (clientAddress.trim() !== '') {
      client.address = clientAddress;
    }

    const updatedClient = await client.save()

    return updatedClient



  };

  static deleteClient = (clientId) => {

    Client.destroy({ where: { id: clientId } })

  };
}

export default ClientsRepository;
