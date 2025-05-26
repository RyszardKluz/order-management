import { Router } from 'express';
import { homeController } from '../controllers/homeController.js';

const homeRoutes = Router();
homeRoutes.get('/', homeController.index);

export { homeRoutes };
