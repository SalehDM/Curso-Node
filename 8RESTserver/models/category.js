const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    statusCategory: {
        type: Boolean,
        default: true,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

CategorySchema.methods.toJSON = function () {
    const { __v, statusCategory, ...data } = this.toObject();

    return data;
};

module.exports = model('Category', CategorySchema);
