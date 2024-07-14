import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	available: {
		type: Boolean,
		default: false
	},
	price: {
		type: Number,
		default: 0
	},
	description: {
		type: String
	}
});

productSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	}
});

export const ProductModel = mongoose.model('Product', productSchema);
