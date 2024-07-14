import { Router } from 'express';
import { ProductService } from '../services/product.service';
import { ProductController } from '../controller/product.controller';
import { body } from 'express-validator';
import { HandleInputErrors } from '../middlewares/validateInput';

export class ProductRouter {
	static get routes(): Router {
		const router = Router();
		const productService = new ProductService();
		const controller = new ProductController(productService);

		router.post(
			'/',
			body('name')
				.notEmpty()
				.withMessage('El nombre no puede ir vació')
				.isString()
				.withMessage('el nombre debe ser un string'),
			body('available')
				.optional()
				.isBoolean()
				.withMessage('El campo available debe ser un booleano'),
			body('price')
				.optional()
				.isFloat({ min: 0 })
				.withMessage('El price debe ser mínimo 0'),
			body('description')
				.notEmpty()
				.withMessage('La descripcion no puede ir vació')
				.isString()
				.withMessage('debe ser un string'),
			HandleInputErrors,
			controller.createProduct
		);

		router.get('/', controller.getProducts);
		return router;
	}
}
