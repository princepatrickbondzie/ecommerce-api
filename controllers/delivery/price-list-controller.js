import { Types } from 'mongoose';
import asyncHandler from '../../middlewares/asyncHandler.js';
import PriceList from '../../models/PriceList.js';

const createPriceList = asyncHandler(async (req, res) => {
    const priceList = await PriceList.create({
        locations: req.body.locations,
        price: req.body.price
    });

    res.status(201).json({
        message: "Price list created successfully",
        priceList
    });
});

const getPriceListById = asyncHandler(async (req, res) => {
    const priceList = await PriceList.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'locations'
    }).lean().exec();

    res.status(200).json({
        message: "Price list retrieved successfully",
        priceList
    });
});

const getAllPriceLists = asyncHandler(async (req, res) => {
    const priceLists = await PriceList.find().populate({
        path: 'locations'
    }).lean().exec();

    res.status(200).json({
        message: "Price list retrieved successfully",
        priceLists
    });
});

const updatePriceList = asyncHandler(async (req, res) => {
    const priceList = await PriceList.findByIdAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, { new: true }).lean().exec();
    if (!priceList)
        throw new Error('Price list not found')

    res.status(200).json({
        message: "Price list updated successfully",
        priceList
    });
})

export { createPriceList, getPriceListById, getAllPriceLists, updatePriceList }