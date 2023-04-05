import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
	role: {
		type: String,
		required: [true, 'El rol es obligatorio'],
	},
});

export const Role = model('Roles', RoleSchema);
