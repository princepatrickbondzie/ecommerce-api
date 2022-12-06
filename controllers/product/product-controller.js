import { UrlType } from '../../common/enums.js';
import ProductMedia from '../../models/ProductMedia.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import Product from '../../models/Product.js';
import Category from '../../models/Category.js';
import User from '../../models/User.js';

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().skip(parseInt(req.query.pageItemCount) * (parseInt(req.query.pageNumber) - 1))
        .limit(parseInt(req.query.pageItemCount))
        .populate({
            path: 'category',
            select: '+name'
        }).populate({ path: 'seller' }).sort({ updatedAt: -1 }).lean().exec();

    res.status(200).json({
        message: 'Products retrieved successfully',
        products
    });

});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(new Types.ObjectId(req.params.id)).populate({
        path: 'category'
    }).populate({ path: 'seller' }).lean().exec();

    res.status(200).json({
        message: 'Products retrieved successfully',
        product
    });

});

const getProductsByCategory = asyncHandler(async (req, res) => {
    //check if category id exists
    const categoryId = await Category.findById(new Types.ObjectId(req.params.id)).lean().exec();
    if (!categoryId)
        throw new Error('Category does not exist');

    const products = await Product.find({ category: new Types.ObjectId(req.params.id) })
        .skip(parseInt(req.query.pageItemCount) * (parseInt(req.query.pageNumber) - 1))
        .limit(parseInt(req.query.pageItemCount))
        .populate({
            path: 'category'
        }).populate({ path: 'seller' }).sort({ updatedAt: -1 }).lean().exec();

    res.status(200).json({
        message: 'Products retrieved successfully',
        products
    });

});

const getProductsBySeller = asyncHandler(async (req, res) => {
    const seller = await User.findOne({ _id: new Types.ObjectId(req.params.id), active: true }).populate({ path: 'roles' }).populate({ path: 'orders' }).populate({ path: 'address' }).lean().exec();
    if (!seller)
        throw new Error('Seller does not exist');

    const products = await Product.find({ seller: new Types.ObjectId(req.params.id) }).skip(parseInt(req.query.pageItemCount) * (parseInt(req.query.pageNumber) - 1))
        .limit(parseInt(req.query.pageItemCount))
        .populate({
            path: 'category'
        }).populate({ path: 'seller' }).sort({ updatedAt: -1 }).lean().exec();

    res.status(200).json({
        message: 'Products retrieved successfully',
        products
    });

});

const createProduct = asyncHandler(async (req, res, next) => {
    let mediaType = '';
    let productMedias = [];

    for (const productMedia of req.body.productMedias) {
        if (productMedia.mediaType.toUpperCase() === UrlType.IMAGE) {
            mediaType = UrlType.IMAGE
        }
        else if (productMedia.mediaType.toUpperCase() === UrlType.VIDEO) {
            mediaType = UrlType.VIDEO
        }
        else {
            throw new Error('Invalid Media Type')
        }

        let media = {
            productUrl: productMedia.productUrl,
            mediaType: mediaType
        };
        productMedias.push(media);
    }

    const createdMedias = await ProductMedia.create(productMedias);
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        seller: req.user._id,
        productMedias: createdMedias
    });

    res.status(200).json({
        message: 'Product created successfully',
        product
    });

});

const updateProduct = asyncHandler(async (req, res) => {

})

export { getAllProducts, getProductById, getProductsByCategory, getProductsBySeller, createProduct, updateProduct };
