import * as Joi from 'joi'

export const auth_schema = Joi.object({
  client_id: Joi.string().required(),
  client_secret: Joi.string().required(),
})