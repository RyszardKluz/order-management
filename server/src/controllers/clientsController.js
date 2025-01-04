import ClientsService from '../services/clientsService';
class ClientsController {
  constructor() {
    this.ClientsService = new ClientsService()
  }

  getClients = async (req, res, next) => {

    const searchValue = req.query.query;

    try {
      const data = await this.ClientsService.getClients(searchValue)
      res.status(200).json(data)

    } catch (error) {
      next(error);
    }

  }


  addClient = async (req, res, next) => {
    const { clientName, clientSurname, clientAddress } = req.body;
    try {
      const newClient = await this.ClientsService.addClient(clientName, clientSurname, clientAddress);
      res.status(200).json({ message: 'Created Client', client: newClient });
    } catch (error) {
      next(error)
    }

  };
  changeClient = async (req, res, next) => {
    const { clientId } = req.params
    const { clientName, clientSurname, clientAddress } = req.body

    try {
      const clientData = await this.ClientsService.changeClient(clientId, clientName, clientSurname, clientAddress);
      res.status(200).json({ message: 'Client updated successfully! ', client: clientData })

    } catch (error) {
      next(error)
    }
  };

  deleteClient = async (req, res, next) => {

    const { clientId } = req.params;
    try {
      await this.ClientsService.deleteClient(clientId)
      res.status(200).json({ message: 'Client deleted succesfully' })
    } catch (error) {
      next(error);
    }
  }
}



export { ClientsController };
