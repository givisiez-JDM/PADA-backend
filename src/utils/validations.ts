import * as coreJoi from "joi";
import * as joiDate from "@joi/date";
import { Allergies, Dosage, Frequency, Method } from "../interfaces/ITreatment";
const Joi = coreJoi.extend(joiDate.default(coreJoi)) as typeof coreJoi;
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

const timeElapsed = Date.now();
const currentDate = new Date(timeElapsed);

export const userSchema = (data: object): coreJoi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const updatePasswordSchema = (data: object) => {
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions).required(),
  })

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
}

export const patientUpdateSchema = (data: object) => {
  const telephoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required().error(new Error("Password must be greater than 8 characters, contain 1 uppercase letter, 1 lowercase letter and 1 symbol")),
    photo: Joi.binary().encoding('base64'),
    telephone: Joi.string().pattern(telephoneRegex).required().messages({
      'string.pattern.base': 'Telephone with value {:[.]} fails to match the required pattern: (19)99999-9999',
    }),
    birthDate: Joi.date().format("DD/MM/YYYY").max("now").required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const patientRegistrationSchema = (data: object): coreJoi.ValidationResult => {
  const allergiesValues = Object.values(Allergies);
  const methodValues = Object.values(Method);

  const schema = Joi.object({
    doctorId: Joi.string().required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    birthDate: Joi.date().format("DD/MM/YYYY").max("now").required().messages({
      'date.format': 'The date of birth must be in DD/MM/YYYY format',
      'date.max': 'The date of birth must be less than or equal to the current date'
    }),
    // allergies: Joi.string().valid(...allergiesValues).required(),
    allergies: Joi.array().items(Joi.string().valid(...allergiesValues)).required(),
    method: Joi.string().valid(...methodValues).required(),
    active: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const doctorSchema = (data: object): coreJoi.ValidationResult => {
  const crmRegex = /^\d{4,10}\/[A-Za-z]{2}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required().error(new Error("Password must be greater than 8 characters, contain 1 uppercase letter, 1 lowercase letter and 1 symbol")),
    about: Joi.string(),
    CRM: Joi.string().min(7).max(13).pattern(crmRegex).messages({
      'string.min': `CRM must be greater than {#limit} characters`,
      'string.max': `CRM must be less than {#limit} characters`,
      'string.pattern.base': 'CRM with value {:[.]} fails to match the required pattern: 123456/SP',
    }),
    specialty: Joi.string().max(40),
    photo: Joi.binary().encoding('base64'),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const myHealthSchema = (data: object): coreJoi.ValidationResult => {
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

export const phaseRegistrationSchema = (data: object): coreJoi.ValidationResult => {
  const dosageValues = Object.values(Dosage);
  const frequencyValues = Object.values(Frequency);

  const schema = Joi.object({
    treatmentId: Joi.string().required(),
    phaseNumber: Joi.number().required(),
    dosage: Joi.string().valid(...dosageValues).required(),
    frequency: Joi.string().valid(...frequencyValues).required(),
    startTreatment: Joi.date().format("DD/MM/YYYY").min(currentDate.toDateString()).required().messages({
      'date.format': 'Treatment start date must be in DD/MM/YYYY format',
      'date.min': 'The treatment start date must be greater than or equal to the current date'
    }),
    endTreatment: Joi.date().format("DD/MM/YYYY").min(Joi.ref("startTreatment")).required().messages({
      'date.format': 'Treatment end date must be in DD/MM/YYYY format',
      'date.min': 'The treatment end date must be greater than or equal to the treatment start date'
    }),
    active: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export const phaseUpdateSchema = (data: object): coreJoi.ValidationResult => {
  const dosageValues = Object.values(Dosage);
  const frequencyValues = Object.values(Frequency);

  const schema = Joi.object({
    phaseNumber: Joi.number().required(),
    dosage: Joi.string().valid(...dosageValues).required(),
    frequency: Joi.string().valid(...frequencyValues).required(),
    startTreatment: Joi.date().format("DD/MM/YYYY").required().messages({
      'date.format': 'Treatment start date must be in DD/MM/YYYY format',
    }),
    endTreatment: Joi.date().format("DD/MM/YYYY").min(Joi.ref("startTreatment")).required().messages({
      'date.format': 'Treatment end date must be in DD/MM/YYYY format',
      'date.min': 'The treatment end date must be greater than or equal to the treatment start date'
    }),
    active: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};
