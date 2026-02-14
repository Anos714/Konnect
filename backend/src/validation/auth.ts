import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[^\s]+$/)
    .required(),
  avatar: Joi.string(),
  bio: Joi.string().min(3).max(250),
  nativeLang: Joi.string(),
  learningLang: Joi.string(),
  location: Joi.string(),
  isOnboarded: Joi.boolean(),
  friends: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[^\s]+$/)
    .required(),
});
