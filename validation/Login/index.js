const Joi = require('joi');

const loginValidationSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().min(2).required(),
});

function loginValidate(body) {
  return Joi.validate(body, loginValidationSchema);
};
module.exports = loginValidate;


