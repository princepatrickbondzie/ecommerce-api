import Joi from '@hapi/joi';
import { JoiObjectId } from '../../middlewares/validator.js';

export default {
  createRole: Joi.object().keys({
    code: Joi.string().required()
  }),
  roleRequest: Joi.object().keys({
    requestedRole: JoiObjectId().required()
  }),
  rolerequestId: Joi.object().keys({
    id: JoiObjectId().required()
  })
};
