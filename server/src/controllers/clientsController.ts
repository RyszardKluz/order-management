import ClientsService from '../services/ClientsService';
import { ControllerFunction } from '../types/ControllerFunction';

class ClientsController {
  private readonly clientsService: ClientsService;
  constructor() {
    this.clientsService = new ClientsService();
  }

  getClients: ControllerFunction = async (req, res, next) => {
    let searchValue = req.query.query;

    if (!searchValue) {
      throw new Error();
    } else if (typeof searchValue !== 'string') {
      const parsedSearchValue = JSON.stringify(searchValue);
      searchValue = parsedSearchValue;
    }
    
    try {
      const data = await this.clientsService.getClients(searchValue);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  addClient: ControllerFunction = async (req, res, next) => {
    const { clientName, clientSurname, clientAddress } = req.body;
    try {
      const newClient = await this.clientsService.addClient(
        clientName,
        clientSurname,
        clientAddress,
      );
      res
        .status(200)
        .json({ message: 'Created Client', client: newClient, ok: true });
    } catch (error) {
      next(error);
    }
  };
  changeClient: ControllerFunction = async (req, res, next) => {
    const { clientId } = req.params;
    const { clientName, clientSurname, clientAddress } = req.body;

    try {
      const clientData = await this.clientsService.changeClient(
        clientId,
        clientName,
        clientSurname,
        clientAddress,
      );
      res.status(200).json({
        message: 'Client updated successfully! ',
        client: clientData,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteClient: ControllerFunction = async (req, res, next) => {
    const { clientId } = req.params;
    try {
      await this.clientsService.deleteClient(clientId);
      res.status(200).json({ message: 'Client deleted succesfully', ok: true });
    } catch (error) {
      next(error);
    }
  };
}

export { ClientsController };
