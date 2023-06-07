import Joi from 'joi';

export const FormLoginSchema = Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required().label('UserName'),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).trim().required().label('Password'),
	passwordConfirm: Joi.not().exist(),
});
