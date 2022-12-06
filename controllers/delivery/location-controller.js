import { Types } from 'mongoose';
import asyncHandler from '../../middlewares/asyncHandler.js';
import Location from '../../models/Location.js';


const createLocation = asyncHandler(async (req, res) => {
    const location = await Location.create({
        name: req.body.name,
    });

    res.status(201).json({
        message: "Location created successfully",
        location
    });
});

const getLocationById = asyncHandler(async (req, res) => {
    const location = await Location.findById(new Types.ObjectId(req.params.id)).lean().exec();

    res.status(200).json({
        message: "Location retrieved successfully",
        location
    });
});

const getAllLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find().lean().exec();

    res.status(200).json({
        message: "Locations retrieved successfully",
        locations
    });
});

const updateLocation = asyncHandler(async (req, res) => {
    const location = await Location.findByIdAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, { new: true }).lean().exec();
    if (!location)
        throw new Error('location not found')

    res.status(200).json({
        message: "Location updated successfully",
        location
    });
});

export { createLocation, getLocationById, getAllLocations, updateLocation }