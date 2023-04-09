import { Schema, model } from 'mongoose';

const ProductSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			unique: true,
		},

		state: {
			type: Boolean,
			default: true,
			required: true,
			description: 'Estado del producto (activo/inactivo)',
		},

		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},

		price: {
			type: Number,
			required: [true, 'El precio es obligatorio'],
		},

		category: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
			required: [true, 'La categoria es obligatoria'],
		},

		description: { type: String },

		available: {
			type: Boolean,
			default: true,
		},

		img: { type: String },

		stock: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

ProductSchema.methods.toJSON = function () {
	const { state, ...product } = this.toObject();
	if (product.user._id) {
		product.user.uid = product.user._id;
		delete product.user._id;
	}
	return product;
};

export const Product = model('Products', ProductSchema);
