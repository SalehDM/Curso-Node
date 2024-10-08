const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    statusProduct: {
        type: Boolean,
        default: true,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: { type: String },
    available: { type: Boolean, default: true },
    img: { type: String },
});

ProductSchema.methods.toJSON = function () {
    const { __v, statusProduct, ...data } = this.toObject();

    return data;
};

module.exports = model('Product', ProductSchema);
