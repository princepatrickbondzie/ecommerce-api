import { model, Schema } from 'mongoose';
import { UrlType } from '../common/enums.js';

export const DOCUMENT_NAME = 'ProductMedia';
export const COLLECTION_NAME = 'productmedias';


const productMediaSchema = new Schema(
    {
        productUrl: {
            type: Schema.Types.String,
            required: true,
        },
        mediaType: {
            type: Schema.Types.String,
            required: true,
            enum: [UrlType.IMAGE, UrlType.VIDEO]
        }
    },
    { versionKey: false }, { timestamps: true }
);

export default model('ProductMedia', productMediaSchema);