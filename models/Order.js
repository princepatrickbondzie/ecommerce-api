import { Schema, model } from "mongoose";
// import Product from './Product';

export const DOCUMENT_NAME = 'Order';
export const COLLECTION_NAME = 'orders';

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderedPrice: {
        type: Schema.Types.Number,
        required: true
    },
    productPrice: {
        type: Schema.Types.Number,
        required: true
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, { versionKey: false }, { timestamps: true });

export default model("Order", orderSchema);
