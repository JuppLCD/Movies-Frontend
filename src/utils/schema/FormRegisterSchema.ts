import Joi from 'joi';

export const FormRegisterSchema = Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required().label('UserName'),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).required().label('Password'),
	passwordConfirm: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.required': `Confirm Password is a required field.`,
		'any.only': 'Password must match',
	}),
}).with('password', 'passwordConfirm');
