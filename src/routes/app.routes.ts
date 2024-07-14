import { Router } from 'express';
import { ProductRouter } from './product.routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		// Definir las rutas
		router.use('/products', ProductRouter.routes);
		return router;
	}
}
