import { Schema, model } from "mongoose";

const brandSchema = new Schema(
    {

        brandId: {
            type: Schema.Types.String,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
        brandMedia: {
            type: Schema.Types.String,
        },
    }, { timestamps: true });

export default model("Brand", brandSchema);
