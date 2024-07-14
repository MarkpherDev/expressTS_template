import { Product } from '../models/interfaces';
import { ProductModel } from '../models/product.model';
import { CustomError } from '../utils/custom.error';

export class ProductService {
	//DI
	constructor() {}

	async createProduct(product: Product) {
		const productExists = await ProductModel.findOne({
			name: product.name
		});

		if (productExists) throw CustomError.badRequest('Product already exists');

		try {
			const newProduct = new ProductModel(product);

			await newProduct.save();

			return newProduct;
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	async getProducts() {
		try {
			const [total, products] = await Promise.all([
				ProductModel.countDocuments(),
				ProductModel.find()
			]);

			return { total, products };
		} catch (error) {
			throw CustomError.internalServer('Internal Server Error');
		}
	}
}
