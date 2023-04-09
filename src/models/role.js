import { Schema, model } from 'mongoose';

const RoleSchema = Schema(
	{
		role: {
			type: String,
			required: [true, 'El rol es obligatorio'],
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Role = model('Roles', RoleSchema);
