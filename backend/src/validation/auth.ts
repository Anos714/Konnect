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
  avatar: Joi.string().uri(),
  bio: Joi.string().min(3).max(250).allow(""),
  nativeLang: Joi.string().allow(""),
  learningLang: Joi.string().allow(""),
  location: Joi.string().allow(""),
  isOnboarded: Joi.boolean().default(false),
  friends: Joi.array().items(Joi.string().hex().length(24)).default([]),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[^\s]+$/)
    .required(),
});
