import Joi from 'joi';

const schema1 = Joi.object().keys({
  userName: Joi.string().min(1).max(15).required()
    .error(new Error('userName should be between 1 and 15 characters long')),
  email: Joi.string().email().required().error(new Error('Invalid email')),
});
const validateInput = input => Joi.validate(input, schema1);
export default validateInput;

const schema2 = Joi.object().keys({
  userName: Joi.string().min(1).max(15).required()
    .error(new Error('userName should be between 1 and 15 characters long')),
});
const validateUserName = input => Joi.validate(input, schema2);
export { validateUserName };
