import express from "express";
import validator from "../../middlewares/validator.js";
import schema from "./schema.js";
import role from "../../middlewares/role.js";
import { RoleCode } from '../../common/enums.js';
import authentication from "../../middlewares/authentication.js";
import { ValidationSource } from '../../common/enums.js';
import { createBrand, getAllBrands, getBrandById, deleteBrand, updateBrand } from '../../controllers/brand/brand-controller.js';

const router = express.Router();

router.get('/all', getAllBrands)
router.post('/create', authentication, role(RoleCode.USER || RoleCode.CUSTOMER_SERVICE), validator(schema.brand), createBrand)
router.get('/:id', validator(schema.brandId, ValidationSource.PARAM), getBrandById)
router.patch('/:id', authentication, validator(schema.brandId, ValidationSource.PARAM), role(RoleCode.USER || RoleCode.CUSTOMER_SERVICE), updateBrand)
router.delete('/:id', authentication, validator(schema.brandId, ValidationSource.PARAM), role(RoleCode.USER || RoleCode.CUSTOMER_SERVICE), deleteBrand)

export default router;