import { model, Schema } from 'mongoose';
import Order from './Order.js';

export const DOCUMENT_NAME = 'AggregateOrder';
export const COLLECTION_NAME = 'aggregateorders';

const aggregateOrderschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order'
            }
        ]
    },
},
    { versionKey: false }, { timestamps: true })
export default model('AggregateOrder', aggregateOrderschema)
