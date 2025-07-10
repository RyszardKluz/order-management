import { Router } from 'express';
import { homeController } from '../controllers/homeController';

const homeRoutes = Router();
homeRoutes.get('/', homeController.index);

export { homeRoutes };
