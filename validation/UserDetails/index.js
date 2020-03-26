const Joi = require('joi');

//fill it later
const userDetailsValidationSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(1).max(20).required(),
  surname: Joi.string().min(2).max(30).required(),
});

function userDetailsValidate(body) {
  return Joi.validate(body, userDetailsValidationSchema);
}

module.exports = userDetailsValidate;