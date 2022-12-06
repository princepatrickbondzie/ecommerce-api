import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'ApiKey';
export const COLLECTION_NAME = 'api_keys';

const apiKeySchema = new Schema({
    key: {
        type: Schema.Types.String,
        required: true,
    },
    metadata: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
}, { versionKey: false }, { timestamps: true });

export default model("ApiKey", apiKeySchema);
