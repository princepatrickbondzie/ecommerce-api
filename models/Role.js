import { Schema, model } from 'mongoose';
import { RoleCode } from '../common/enums.js';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

const roleSchema = new Schema({
    code: {
        type: Schema.Types.String,
        unique: true,
        required: true,
        enum: [
            RoleCode.APP,
            RoleCode.USER,
            RoleCode.ADMIN,
            RoleCode.SELLER,
            RoleCode.MERCHANT,
            RoleCode.SUPPLIER,
            RoleCode.DISPATCH,
            RoleCode.SUPER_ADMIN,
            RoleCode.CUSTOMER_SERVICE,
        ]
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
}, { versionKey: false }, { timestamps: true });

export default model("Role", roleSchema);

