import express from "express";
import validator from "../../middlewares/validator.js";
import authentication from "../../middlewares/authentication.js";
import schema from "./schema.js";
import role from "../../middlewares/role.js";
import { RoleCode } from '../../common/enums.js';
import authorization from "../../middlewares/authorization.js";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../../controllers/category/category.controller.js';
import { ValidationSource } from '../../common/enums.js';

const router = express.Router();

router.get("/all", getAllCategories);
router.get("/:id", validator(schema.categoryId, ValidationSource.PARAM), getCategoryById);
router.post("/create", validator(schema.category), createCategory);
// router.post("/create", authentication, role(RoleCode.ADMIN || RoleCode.CUSTOMER_SERVICE), authorization, validator(schema.category), createCategory);
router.patch("/:id", authentication, validator(schema.categoryId, ValidationSource.PARAM), role(RoleCode.ADMIN || RoleCode.CUSTOMER_SERVICE), updateCategory);
router.delete("/:id", validator(schema.categoryId, ValidationSource.PARAM), deleteCategory);
// router.delete("/:id", authentication, validator(schema.categoryId, ValidationSource.PARAM), role(RoleCode.ADMIN || RoleCode.CUSTOMER_SERVICE), deleteCategory);

export default router;
