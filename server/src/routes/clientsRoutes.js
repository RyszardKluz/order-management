import { Router } from 'express';
import { ClientsController } from '../controllers/clientsController.js';

const clientsRoutes = Router();
const clientsCntrl = new ClientsController();

clientsRoutes.get('/', clientsCntrl.getClients);

clientsRoutes.post('/', clientsCntrl.addClient);

clientsRoutes.patch('/:clientId', clientsCntrl.changeClient);

clientsRoutes.delete('/:clientId', clientsCntrl.deleteClient);

export { clientsRoutes };
