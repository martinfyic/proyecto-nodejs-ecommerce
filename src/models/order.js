import { Schema, model } from 'mongoose';

const OrderSchema = Schema(
	{
		purchase: {
			type: Array,
			required: true,
			default: [],
		},

		userId: {
			type: String,
			required: true,
		},

		userEmail: {
			type: String,
			required: true,
		},

		userName: {
			type: String,
			required: true,
		},

		state: {
			type: Boolean,
			default: true,
			required: true,
			description: 'Estado de la orden (activo/inactivo)',
		},
	},
	{ timestamps: true, versionKey: false }
);

OrderSchema.methods.toJSON = function () {
	const { state, _id, ...order } = this.toObject();
	order.orderId = _id;
	return order;
};

export const Order = model('Orders', OrderSchema);
