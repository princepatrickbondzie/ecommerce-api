import Joi from '@hapi/joi';
import { JoiObjectId } from '../../middlewares/validator.js';

export default {
    order: Joi.object().keys({
        user: JoiObjectId().required(),
        orderedPrice: Joi.number().required(),
        productPrice: Joi.number().required(),
        products: Joi.array(),
    }),
    orderId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
    sellerId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};
