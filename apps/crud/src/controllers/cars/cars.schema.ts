import * as Joi from 'joi'

export const cars_schema = Joi.object({
    make: Joi.string().max(50).required(),
    model: Joi.string().max(50).required(),
    year: Joi.number().required(),
    technical: Joi.object({
      weight: Joi.number().required(),
      height: Joi.number().required(),
      size: Joi.string().required(),
      fuel_type: Joi.string().required(),
      transmission: Joi.string().required(),
      horses: Joi.number().required(),
    }).required()
})