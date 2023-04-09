import { Schema, model } from 'mongoose';

const UserSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
		},
		email: {
			type: String,
			required: [true, 'El mail es obligatorio'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatorio'],
		},
		img: {
			type: String,
		},
		role: {
			type: String,
			required: true,
		},
		state: {
			type: Boolean,
			default: true,
			description: 'Estado del usuario (activo/inactivo)',
		},
		google: {
			type: Boolean,
			default: false,
			description: 'loggin con google (verdadero/falso)',
		},
	},
	{ timestamps: true, versionKey: false }
);

UserSchema.methods.toJSON = function () {
	const { password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export const User = model('Users', UserSchema);
