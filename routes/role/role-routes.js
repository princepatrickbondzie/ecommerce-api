import express from "express";
import validator from "../../middlewares/validator.js";
import authentication from "../../middlewares/authentication.js";
import schema from "./schema.js";
import role from "../../middlewares/role.js";
import { RoleCode } from '../../common/enums.js';
import authorization from "../../middlewares/authorization.js";
import { createRole, requestARole, getAllRoles, getAllRoleRequests, updateRoleRequest } from '../../controllers/role/role-controller.js';
import { ValidationSource } from '../../common/enums.js';

const router = express.Router();

router.post("/create", validator(schema.createRole), createRole);
router.post("/request", validator(schema.roleRequest), requestARole);
router.get("/all", authentication, getAllRoles);
router.get("/request/all", authentication, getAllRoleRequests);
router.put("/request/:id", authentication, validator(schema.rolerequestId, ValidationSource.PARAM), role(RoleCode.ADMIN), authorization, updateRoleRequest);

export default router;
