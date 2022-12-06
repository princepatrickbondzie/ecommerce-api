import { Types } from 'mongoose';
import asyncHandler from '../../middlewares/asyncHandler.js';
import Category from '../../models/Category.js';
import { randomGenerator } from '../../common/auth.js'

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()

    res.status(200).json({
        message: "Categories retrieved successfully",
        categories
    });
});

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(new Types.ObjectId(req.params.id)).lean().exec();

    res.status(200).json({
        message: "Category retrieved successfully",
        category
    });
});

const createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create({
        categoryId: randomGenerator(),
        name: req.body.name
    });

    res.status(200).json({
        message: "Category created successfully",
        category
    });
});

const updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, { new: true })

    res.status(200).json({
        message: "Category updated successfully",
        category
    });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    await Category.findByIdAndDelete(new Types.ObjectId(req.params.id))

    res.status(200).json({ message: "Category deleted successfully" });
});

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }; 