import { Request, Response } from 'express';
import { CustomError } from '../utils/custom.error';
import { ProductService } from '../services/product.service';

export class ProductController {
	constructor(private readonly productService: ProductService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		} else {
			console.log(`${error}`);
			return res.status(500).json({ error: 'Internal server error' });
		}
	};

	createProduct = (req: Request, res: Response) => {
		const { body } = req;
		body.image = req.file;
		this.productService
			.createProduct(body)
			.then(product => res.status(201).json(product))
			.catch(error => this.handleError(error, res));
	};

	getProducts = (req: Request, res: Response) => {
		this.productService
			.getProducts()
			.then(products => res.json(products))
			.catch(error => this.handleError(error, res));
	};
}
