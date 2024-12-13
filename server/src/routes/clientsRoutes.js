import { Router } from 'express';
import { ClientsController } from '../controllers/clientsController.js';

const clientsRoutes = Router();
const clientsCntrl = new ClientsController();

clientsRoutes.get('/clients', clientsCntrl.getAllClients);
clientsRoutes.get('/clients/search', clientsCntrl.getClientByQuery);

clientsRoutes.post('/clients', clientsCntrl.addClient);

clientsRoutes.patch('/clients/:clientId', clientsCntrl.changeClient);

clientsRoutes.delete('/clients/:clientId', clientsCntrl.deleteClient)

export { clientsRoutes };
