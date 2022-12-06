import { Schema, model } from "mongoose";
// import Address from './Address';
// import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

const userSchema = new Schema(
    {
        clientId: { type: Schema.Types.String, required: true },
        firstName: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 50
        },
        lastName: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 50
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            required: true,
            trim: true,
            select: false,
        },
        dateOfBirth: {
            type: Schema.Types.Date,
        },
        contact: {
            type: Schema.Types.String,
            unique: true,
            required: true
        },
        password: {
            type: Schema.Types.String,
            required: true,
            select: false
        },
        roles: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Role'
                }
            ]
        },
        dateOfJoining: {
            type: Schema.Types.Date,
        },
        address: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Address'
                }
            ]
        },
        country: { type: Schema.Types.String },
        active: { type: Schema.Types.Boolean, default: true },
        products: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                }
            ]
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
    { versionKey: false }, { timestamps: true }
);

export default model("User", userSchema);
