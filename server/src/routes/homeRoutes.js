import { Router } from 'express';
import { homeController } from '../controllers/homeController.js';

const router = Router();

router.get('/', homeController.index);

const homeRoutes = router;

export { homeRoutes };
