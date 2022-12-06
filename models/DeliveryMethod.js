import { Schema, model } from "mongoose";

const deliveryMethodSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    priceList: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PriceList'
            }
        ]
    },
}, { versionKey: false }, { timestamps: true });

export default model("DeliveryMethod", deliveryMethodSchema);
