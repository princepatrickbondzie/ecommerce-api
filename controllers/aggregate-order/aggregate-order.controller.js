import { Types } from 'mongoose';
// import { InternalError } from '../../core/ApiError.js';
// import { SuccessResponse } from '../../core/ApiResponse.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import Cart from '../../models/Cart.js';
import Order from '../../models/Order.js';
import AggregateOrder from '../../models/AggregateOrder.js';

const createAggregateOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).lean()
    .populate({
      path: 'products'
    }).exec();

  if (!cart)
    throw new Error('No cart for user');

  if (cart.products.length === 0)
    throw new Error("No products in cart");

  let orders = [];
  for (const orderedProduct of cart.products) {
    let order = {
      user: req.user._id,
      orderedPrice: orderedProduct.price - (orderedProduct.price * (orderedProduct.discountPercentage / 100)),
      productPrice: orderedProduct.price,
      product: orderedProduct
    };
    orders.push(order);
  }

  const createdOrders = await Order.insertMany(orders);
  const aggregateOrder = {
    user: req.user._id,
    orders: createdOrders
  };

  const order = await AggregateOrder.create(aggregateOrder);
  cart.products = [];
  CartRepo.update(cart);

  res.status(201).json({
    message: "Order placed successfully",
    order
  });

  // return new SuccessResponse("Order placed successfully", order).send(res);
});

const getAggregateOrderById = asyncHandler(async (req, res) => {
  const order = await AggregateOrder.findById(new Types.ObjectId(req.params.id)).populate({
    path: 'orders'
  }).lean().exec();

  res.status(200).json({
    message: "Order retrieved successfully",
    order
  });

  // return new SuccessResponse("Order retrieved successfully", order).send(res);
});

const getAggregateOrderByUser = asyncHandler(async (req, res) => {
  const order = await AggregateOrder.find({ user: req.user._id }).skip(parseInt(req.query.pageItemCount) * (parseInt(req.query.pageNumber) - 1))
    .limit(parseInt(req.query.pageItemCount))
    .populate({
      path: 'orders'
    })
    .sort({ updatedAt: -1 })
    .lean()
    .exec();

  res.status(200).json({
    message: "Order for a user retrieved successfully",
    order
  });

  // return new SuccessResponse("Order for a user retrieved successfully", order).send(res);
});

const getPriceOfAggregateOrder = asyncHandler(async (req, res) => {
  const aggregateOrder = await AggregateOrder.findById(new Types.ObjectId(req.params.id)).populate({
    path: 'orders'
  }).lean().exec();

  if (aggregateOrder === null || aggregateOrder._id === undefined)
    throw new Error('No order found');

  let totalPrice = 0;
  for (const order of aggregateOrder.orders) {
    totalPrice = totalPrice + order.orderedPrice;
  }

  res.status(200).json({
    message: "Total order price",
    totalPrice
  });

  // return new SuccessResponse("Total order price", totalPrice).send(res);
});

export { createAggregateOrder, getAggregateOrderById, getAggregateOrderByUser, getPriceOfAggregateOrder };
