import { Types } from 'mongoose';
// import { SuccessResponse } from '../../core/ApiResponse.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';



const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate({
        path: 'products'
    }).lean().exec();

    if (!orders)
        throw new InternalError('Orders not available');

    res.status(200).json({
        message: 'Orders Retrieved  successfully',
        orders
    });
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'product'
    }).lean().exec();

    if (!order)
        throw new InternalError('Invalid orderId');

    res.status(200).json({
        message: 'Order Retrieved  successfully',
        order
    });
    // return new SuccessResponse("Order Retrieved Successfully", order).send(res);
});

const createOrder = asyncHandler(async (req, res) => {
    const orders = req.body;
    for (const order of orders) {
        order.createdAt = order.updatedAt = new Date();
    }
    const od = await Order.insertMany(orders);

    res.status(200).json({
        message: 'Order Retrieved  successfully',
        od
    });
});

const getOrdersBySeller = asyncHandler(async (req, res) => {
    const { sellerId, pageNumber, limit } = req.body;

})


export { getOrderById, createOrder, getOrdersBySeller, getAllOrders };