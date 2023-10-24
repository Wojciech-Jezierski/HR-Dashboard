import * as Yup from 'yup';
import { string } from 'yup';

export const userSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Please use at least 3 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  lastName: Yup.string()
    .min(3, 'Please use at least 3 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  email: Yup.string().email().required('This field cannot be empty'),
  password: string()
    .min(5, 'Password must have minimum 5 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same')
    .required('This field cannot be empty'),
});

export const userSignInSchema = Yup.object({
  email: Yup.string().email().required('This field cannot be empty'),
  password: string()
    .min(5, 'Password must have minimum 5 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
});

export const editJobSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must have minimum 3 characters')
    .max(15, 'Title must have maximum 15 characters')
    .required('This field cannot be empty'),
  shortDescription: Yup.string()
    .min(5, 'Short Description must have minimum 5 characters')
    .max(20, 'Short Description must have maximum 20 characters')
    .required('This field cannot be empty'),
  companyName: Yup.string()
    .min(5, 'Company Name must have minimum 5 characters')
    .max(15, 'Company Name must have maximum 15 characters')
    .required('This field cannot be empty'),
  longDescription: Yup.string()
    .min(5, 'Long Description must have minimum 5 characters')
    .max(100, 'Long Description must have maximum 100 characters'),
  logo: Yup.string()
    .min(3, 'Logo must have minimum 3 characters')
    .max(15, 'Logo must have maximum 15 characters'),
});

export const editCandidateSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must have minimum 3 characters')
    .max(15, 'Name must have maximum 15 characters')
    .required('This field cannot be empty'),

  position: Yup.string()
    .min(3, 'Position must have minimum 3 characters')
    .max(15, 'Position must have maximum 15 characters')
    .required('This field cannot be empty'),
});

export const addJobSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must have minimum 3 characters')
    .max(15, 'Title must have maximum 15 characters')
    .required('This field cannot be empty'),
  shortDescription: Yup.string()
    .min(5, 'Short Description must have minimum 5 characters')
    .max(20, 'Short Description must have maximum 20 characters')
    .required('This field cannot be empty'),
  companyName: Yup.string()
    .min(5, 'Company Name must have minimum 5 characters')
    .max(15, 'Company Name must have maximum 15 characters')
    .required('This field cannot be empty'),
  longDescription: Yup.string()
    .min(5, 'Long Description must have minimum 5 characters')
    .max(100, 'Long Description must have maximum 100 characters'),
  logo: Yup.string()
    .min(3, 'Logo must have minimum 3 characters')
    .max(15, 'Logo must have maximum 15 characters'),
});

export const addCandidateSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must have minimum 5 characters')
    .max(15, 'Name must have maximum 15 characters')
    .required('This field cannot be empty'),
  position: Yup.string()
    .min(3, 'Position must have minimum 3 characters')
    .max(15, 'Position must have maximum 15 characters')
    .required('This field cannot be empty'),
  shortDescription: Yup.string()
    .min(5, 'Short Description must have minimum 5 characters')
    .max(15, 'Short Description must have maximum 15 characters')
    .required('This field cannot be empty'),
  longDescription: Yup.string()
    .min(5, 'Long Description must have minimum 5 characters')
    .max(100, 'Long Description must have maximum 100 characters'),
  logo: Yup.string()
    .min(3, 'Logo must have minimum 3 characters')
    .max(15, 'Logo must have maximum 15 characters')
    .required(),
  companyName: Yup.string()
    .min(3, 'Company Name must have minimum 3 characters')
    .max(15, 'Company Name must have maximum 15 characters')
    .required('This field cannot be empty'),
});

export const userSchemaPasswordsValidation = Yup.object({
  oldPassword: string()
    .min(5, 'Password must have minimum 5 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  password: string()
    .min(5, 'Password must have minimum 5 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same')
    .required('This field cannot be empty'),
});

export const userSchemaNamesValidation = Yup.object({
  firstName: Yup.string()
    .min(3, 'Please use at least 3 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
  lastName: Yup.string()
    .min(3, 'Please use at least 3 characters')
    .max(15, 'Please use at most 15 characters')
    .required('This field cannot be empty'),
});

export const addMeetingSchema = Yup.object({
  type: Yup.string()
    .min(3, 'Type must have minimum 3 characters')
    .max(15, 'Type must have maximum 15 characters')
    .required(),
  date: Yup.date().required(),
  place: Yup.string().min(
    5,
    'Place Description must have minimum 5 characters',
  ),
  candidateId: Yup.string().required(),
  JobId: Yup.string().required(),
});
