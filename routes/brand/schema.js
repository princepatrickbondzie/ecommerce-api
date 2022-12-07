import Joi from '@hapi/joi';
import { JoiObjectId } from '../../middlewares/validator.js';

export default {
    brand: Joi.object().keys({
        name: Joi.string().required(),
        brandMedia: Joi.string().optional(),
    }),
    brandId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
}