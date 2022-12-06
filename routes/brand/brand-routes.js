import express from "express";
import validator from "../../middlewares/validator.js";
import schema from "./schema.js";
import authentication from "../../middlewares/authentication.js";
import { createBrand, getAllBrands, getBrandById, deleteBrand, updateBrand } from '../../controllers/brand/brand-controller.js';

const router = express.Router();

// router.use('/', authentication)
router.get('/all', getAllBrands)
router.post('/create', validator(schema.brand), createBrand)
router.get('/', getBrandById)
router.patch('/:id', updateBrand)
router.delete('/:id', deleteBrand)


export default router;