import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Address';
export const COLLECTION_NAME = 'addresses';

const addressSchema = new Schema({
    fullname: {
        type: Schema.Types.String,
        required: true,
    },
    mobile: {
        type: Schema.Types.Number,
        required: true,
        length: 10
    },
    pincode: {
        type: Schema.Types.Number,
        required: true,
        length: 6
    },
    line1: {
        type: Schema.Types.String,
        required: true,
    },
    line2: {
        type: Schema.Types.String,
        required: true,
    },
    landmark: {
        type: Schema.Types.String,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    region: {
        type: Schema.Types.String,
        required: true,
    },
}, { versionKey: false }, { timestamps: true });

export default model("Address", addressSchema)