import { Types } from 'mongoose';
import asyncHandler from '../../middlewares/asyncHandler.js';
import Brand from '../../models/Brand.js';
import { randomGenerator } from '../../common/auth.js'

const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find().lean().exec();

    res.status(200).json({
        message: "Brands retrieved successfully",
        brands
    });
});

const getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(new Types.ObjectId(req.params.id)).lean().exec();

    res.status(200).json({
        message: "Brand retrieved successfully",
        brand
    });
});

const createBrand = asyncHandler(async (req, res, next) => {
    const brand = await Brand.create({
        brandId: randomGenerator(),
        name: req.body.name
    });

    res.status(200).json({
        message: "Brand created successfully",
        brand
    });
});

const updateBrand = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findByIdAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, { new: true });

    res.status(200).json({
        message: "Brand created successfully",
        brand
    });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
    try {
        await Brand.findByIdAndDelete(new Types.ObjectId(req.params.id))

        res.status(200).json({
            message: "Brand delete successfully",
        });
    } catch (err) {
        throw new Error(err);
    }
})

export { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand }