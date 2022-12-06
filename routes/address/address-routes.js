import express from "express";
import validator from "../../middlewares/validator.js";
import schema from "./schema.js";
import authentication from "../../middlewares/authentication.js";
import { createAddress } from "../../controllers/address/address-controller.js";
const router = express.Router();

// router.use("/", authentication);
router.post("/create", authentication, validator(schema.address), createAddress);

export default router;
