import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[^\s]+$/)
    .messages({
      "string.pattern.base":
        "Password must have at least one uppercase, one lowercase, one number, one special character, and no spaces",
    })
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[^\s]+$/)
    .required(),
});

export const onboardSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).optional(),
  avatar: Joi.string().uri().allow("").optional(),
  bio: Joi.string().min(3).max(250).allow("").optional(),
  nativeLang: Joi.string().trim().min(1).required(),
  learningLang: Joi.string().trim().min(1).required(),
  location: Joi.string().trim().min(1).required(),
});
