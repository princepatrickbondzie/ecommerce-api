import Joi from "@hapi/joi";
import { JoiAuthBearer } from "../../middlewares/validator.js";

export default {
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    contact: Joi.string().required().min(9),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    dateOfBirth: Joi.date().optional()
  }),
};
