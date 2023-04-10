import { Schema, model } from 'mongoose';

const CartSchema = Schema(
	{
		products: {
			type: Array,
			required: true,
			default: [],
		},

		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},

		state: {
			type: Boolean,
			default: true,
			required: true,
			description: 'Estado del carrito de compras (activo/inactivo)',
		},
	},
	{ timestamps: true, versionKey: false }
);

CartSchema.methods.toJSON = function () {
	const { state, _id, ...cart } = this.toObject();
	cart.cartId = _id;
	return cart;
};

export const Cart = model('Carts', CartSchema);
