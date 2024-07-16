import { unlink } from 'fs/promises';
import { Product } from '../models/interfaces';
import { ProductModel } from '../models/product.model';
import { CustomError } from '../utils/custom.error';
import { handleUpload } from '../utils/imageUpload';

export class ProductService {
	//DI
	constructor() {}

	async createProduct(product: Product) {
		const productExists = await ProductModel.findOne({
			name: product.name
		});
		const imageUrl = await handleUpload(product.image);

		if (productExists) throw CustomError.badRequest('Product already exists');

		try {
			const tempProduct = {
				name: product.name,
				available: product.available,
				description: product.description,
				price: product.price,
				image: imageUrl
			};
			const saveProduct = new ProductModel(tempProduct);
			await saveProduct.save();

			return saveProduct;
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
