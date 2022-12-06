import { Schema, model } from "mongoose";
// import Address from './Address';
// import Role from './Role';

export const DOCUMENT_NAME = 'Merchant';
export const COLLECTION_NAME = 'merchants';


const merchantSchema = new Schema({
    storeName: {
        type: Schema.Types.String,
        trim: true,
        maxlength: 100
    },
})

export default model("Merchant", merchantSchema);