import { model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'Cart';
export const COLLECTION_NAME = 'carts';

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    }
}, { versionKey: false }, { timestamps: true });

export default model("Cart", cartSchema);