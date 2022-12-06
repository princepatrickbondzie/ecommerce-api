import { Types } from 'mongoose';
import asyncHandler from '../../middlewares/asyncHandler.js';
import DeliveryMethod from '../../models/DeliveryMethod.js';

const createDeliveryMethod = asyncHandler(async (req, res) => {
    const deliveryMethod = await DeliveryMethod.create({
        name: req.body.name,
        priceList: req.body.priceList
    });

    res.status(201).json({
        message: "Delivery Method created successfully",
        deliveryMethod
    });
});

const getDeliveryMethodById = asyncHandler(async (req, res) => {
    const deliverymethod = await DeliveryMethod.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'priceList'
    }).lean().exec();

    res.status(200).json({
        message: "Delivery method retrieved successfully",
        deliverymethod
    });
});

const getAllDeliveryMethods = asyncHandler(async (req, res) => {
    const deliverymethods = await DeliveryMethod.find().populate({
        path: 'priceList'
    }).lean().exec();

    res.status(200).json({
        message: "Delivery method retrieved successfully",
        deliverymethods
    });
});

const updateDeliveryMethod = asyncHandler(async (req, res) => {
    const delivery = await DeliveryMethod.findByIdAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, { new: true }).lean().exec();
    if (!delivery)
        throw new Error('Delivery method not found')

    res.status(200).json({
        message: "Delivery method updated successfully",
        delivery
    });
})

export { createDeliveryMethod, getDeliveryMethodById, getAllDeliveryMethods, updateDeliveryMethod }