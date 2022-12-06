import express from 'express';
import schema from './schema.js';
import role from '../../middlewares/role.js';
import validator from '../../middlewares/validator.js';
import { ValidationSource } from '../../common/enums.js';
import authorization from '../../middlewares/authorization.js';
import authentication from '../../middlewares/authentication.js';
import { createProduct, getAllProducts, getProductById, getProductsByCategory, getProductsBySeller, updateProduct } from '../../controllers/product/product-controller.js';
import { RoleCode } from '../../common/enums.js';

const router = express.Router();

router.get('/all', validator(schema.pagination, ValidationSource.QUERY), getAllProducts);
router.get('/:id', validator(schema.productId, ValidationSource.PARAM), getProductById);
router.get('/category/:id', validator(schema.categoryId, ValidationSource.PARAM), validator(schema.pagination, ValidationSource.QUERY), getProductsByCategory);
router.get('/seller/:id', authentication, validator(schema.sellerId, ValidationSource.PARAM), validator(schema.pagination, ValidationSource.QUERY), getProductsBySeller);
router.post('/', authentication, role(RoleCode.SELLER || RoleCode.SUPER_ADMIN || RoleCode.ADMIN), authorization, validator(schema.product), createProduct);
router.patch('/:id', authentication, role(RoleCode.SELLER || RoleCode.SUPER_ADMIN || RoleCode.ADMIN), validator(schema.productId, ValidationSource.PARAM), updateProduct);

export default router;