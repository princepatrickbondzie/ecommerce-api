import { Types } from 'mongoose';
// import { InternalError } from '../../core/ApiError.js';
// import { SuccessResponse } from '../../core/ApiResponse.js';
import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';
import asyncHandler from '../../middleware/asyncHandler.js';

const createCart = asyncHandler(async (req, res) => {
    let productId = req.body.product;
    let userId = req.user._id;

    const productToAdd = await Product.findById(productId)
        .populate({
            path: 'category'
        }).populate({ path: 'seller' }).lean().exec();

    if (productToAdd._id === undefined || productToAdd === null)
        throw new Error('Invalid Product');

    const product = {
        _id: productId
    };

    const cart = await Cart.findOne({ user: userId }).lean()
        .populate({
            path: 'products'
        }).exec();

    if (!cart) {
        let cart = {
            user: userId,
            products: [product]
        };
        const createdCart = await Cart.create(cart);

        res.status(200).json({
            message: "Product added to cart",
            cart: createdCart._id
        });
        // return new SuccessResponse("Product added to cart", createdCart._id).send(res);
    }

    if (cart.products.includes(product))
        throw new Error("Product already added");

    cart.products.push(product);
    CartRepo.update(cart);

    res.status(200).json({
        message: "Product added to cart",
        cart: cart._id
    });
    // return new SuccessResponse("Product added to cart", cart._id).send(res);
});

const getCartById = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'products'
    })
        .lean()
        .exec(); // Check this method by removing products from cart

    res.status(200).json({
        message: "Cart data retrieved successfully",
        cart: cart.products
    });

    // return new SuccessResponse("Cart data retrieved successfully", cart.products).send(res);
});

const getCartPrice = asyncHandler(async (req, res) => {
    let totalPrice = 0;

    const cart = await Cart.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'products'
    }).lean().exec();

    if (cart.products.length === 0)
        throw new Error("No products in cart");

    cart.products.forEach(product => {
        totalPrice = totalPrice + product.price - (product.price * (product.discountPercentage / 100));
    });

    res.status(200).json({
        message: "Total cart price",
        totalPrice
    });

    // return new SuccessResponse("Total cart price", totalPrice).send(res);
});

export { createCart, getCartById, getCartPrice };
