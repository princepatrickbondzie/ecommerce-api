import { Schema, model } from 'mongoose';
// import Role from './Role';

export const DOCUMENT_NAME = 'RequestRole';
export const COLLECTION_NAME = 'requestroles';


const requestRoleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedRole: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Schema.Types.Boolean,
        default: false
    },
}, { versionKey: false }, { timestamps: true });

export default model("RequestRole", requestRoleSchema);