import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
	name: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
});

CategorySchema.methods.toJSON = function () {
	const { __v, state, ...category } = this.toObject();
	if (category.user._id) {
		category.user.uid = category.user._id;
		delete category.user._id;
	}
	return category;
};

export const Category = model('Categories', CategorySchema);
