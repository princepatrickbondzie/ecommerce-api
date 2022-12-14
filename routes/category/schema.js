import Joi from '@hapi/joi';
import { JoiObjectId } from '../../middlewares/validator.js';

export default {
    category: Joi.object().keys({
        name: Joi.string().required()
    }),
    categoryId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
};
