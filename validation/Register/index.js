const Joi = require('joi');

const registerValidationSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().min(2).required(),
  email: Joi.string().min(4).max(40).email().required(),
});

function registerValidate(body) {
  return Joi.validate(body, registerValidationSchema);
};
module.exports = registerValidate;


