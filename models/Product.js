import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = 'Product';
export const COLLECTION_NAME = 'products';

const productSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand'
        },
        shortDescription: {
            type: Schema.Types.String,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        discountPercentage: {
            type: Schema.Types.Number,
            default: 0
        },
        productMedias: [{
            type: Schema.Types.ObjectId,
            ref: 'ProductMedia'
        }],
        stock: {
            type: Schema.Types.Number,
            required: true
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order"
        }],
        active: { type: Schema.Types.Boolean, default: true },
    },
    { timestamps: true }
);

export default model("Product", productSchema);
