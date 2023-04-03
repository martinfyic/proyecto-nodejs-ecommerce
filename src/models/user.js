import { Schema, model } from 'mongoose';

const UserSchema = Schema({
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
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export const User = model('Users', UserSchema);
