import Joi from '@hapi/joi';

export default {
    brand: Joi.object().keys({
        name: Joi.string().required(),
        brandMedia: Joi.string().optional(),
    }),
}