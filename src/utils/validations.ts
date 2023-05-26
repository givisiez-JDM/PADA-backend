import * as Joi from "joi";
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

export const userSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
}


export const patientSchema = (data: object) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required(),
    role: Joi.string().valid("patient")
  });
  
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
}

export const doctorSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions),
    role: Joi.string().valid("doctor").required()
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
}