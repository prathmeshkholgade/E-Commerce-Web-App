const Joi = require("joi");

const productSchema = Joi.object({
  _id: Joi.string().optional(),
  __v: Joi.number().allow(),
  name: Joi.string().required(),
  description: Joi.string().required().min(25),
  price: Joi.number().min(0).required(),
  imageUrl: Joi.string().required(),
  category: Joi.string().required(),
  owner: Joi.object().required(),
});
module.exports = productSchema;
