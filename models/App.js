import { Schema, model } from "mongoose";

const appSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, unique: true },
    supportMail: { type: String, unique: true },
    apiKey: { type: String, unique: true },
    active: { type: Boolean, default: true },
    orders: { type: Schema.Types.ObjectId, ref: "Transaction" },
  },
  { timestamps: true }
);

export default model("App", appSchema);