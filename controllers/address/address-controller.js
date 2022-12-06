import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import Address from '../../models/Address.js';

const createAddress = asyncHandler(async (req, res) => {
    const address = await Address.create({
        fullname: req.body.fullname,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        line1: req.body.line1,
        line2: req.body.line2,
        landmark: req.body?.landmark,
        city: req.body.city,
        region: req.body.region,
    });

    req.user.address.push(address._id);
    User.updateOne({ _id: req.user._id }, { $set: { ...req.user } }).lean().exec();

    res.status(200).json({
        message: "Address added",
        address
    })
    // return new SuccessResponse("Address added", address).send(res);
});

export { createAddress }