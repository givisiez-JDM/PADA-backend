import * as Joi from "joi";
import { Allergies, Dosage, Frequency, Method } from "../interfaces/ITreatment";
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

export const userSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const patientUpdateSchema = (data: object) => {
  const telephoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required(),
    // role: Joi.string().valid("patient"),
    photo: Joi.string(),
    telephone: Joi.string().pattern(telephoneRegex).required(),
    birthDate: Joi.date().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const patientRegistrationSchema = (data: object): Joi.ValidationResult => {
  const dosageValues = Object.values(Dosage);
  const allergiesValues = Object.values(Allergies);
  const frequencyValues = Object.values(Frequency);
  const methodValues = Object.values(Method);

  const schema = Joi.object({
    doctorId: Joi.string().required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    birthDate: Joi.date().required(),
    dosage: Joi.string().valid(...dosageValues).required(),
    allergies: Joi.string().valid(...allergiesValues).required(),
    frequency: Joi.string().valid(...frequencyValues).required(),
    method: Joi.string().valid(...methodValues).required(),
    startTreatment: Joi.date().required(),
    endTreatment: Joi.date().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const doctorSchema = (data: object): Joi.ValidationResult => {
  const crmRegex = /^\d{4,10}\/[A-Za-z]{2}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions),
    about: Joi.string(),
    CRM: Joi.string().min(7).max(13).pattern(crmRegex).required(),
    specialty: Joi.string().max(40),
    photo: Joi.string(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const myHealthSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    generalHealth: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.date().required(),
    patientId: Joi.string().required()
  })

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
}