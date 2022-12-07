import express from "express";
import validator from "../../middlewares/validator.js";
import authentication from "../../middlewares/authentication.js";
import schema from "./schema.js";
import role from '../../middlewares/role.js';
import { createOrder, getOrderById, getOrdersBySeller, getAllOrders } from '../../controllers/order/order.controller.js';
import { RoleCode, ValidationSource } from '../../common/enums.js';

const router = express.Router();

router.get("/all", authentication, validator(schema.orderId, ValidationSource.PARAM), role(RoleCode.CUSTOMER_SERVICE || RoleCode.SUPER_ADMIN, RoleCode.ADMIN), getAllOrders);
router.get("/:id", authentication, validator(schema.orderId, ValidationSource.PARAM), role(RoleCode.CUSTOMER_SERVICE || RoleCode.SUPER_ADMIN, RoleCode.ADMIN), getOrderById);
router.get("/:id", authentication, validator(schema.sellerId, ValidationSource.PARAM), role(RoleCode.CUSTOMER_SERVICE || RoleCode.SUPER_ADMIN, RoleCode.ADMIN || RoleCode.SELLER), getOrdersBySeller);
router.post("/create", authentication, role(RoleCode.USER || RoleCode.SELLER), validator(schema.order, ValidationSource.BODY), createOrder);

export default router;
