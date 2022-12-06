import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = 'Category';
export const COLLECTION_NAME = 'categories';

// const subCategorySchema = new Schema({
//     name: { type: String, required: true },
// });

const categorySchema = new Schema(
    {
        categoryId: {
            type: Schema.Types.String,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
    }, { timestamps: true });

export default model("Category", categorySchema);
