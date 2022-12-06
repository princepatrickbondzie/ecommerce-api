import { Schema, model } from "mongoose";

const priceListSchema = new Schema({
    locations: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Location'
            }
        ]
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    }
});

export default model("PrceList", priceListSchema);