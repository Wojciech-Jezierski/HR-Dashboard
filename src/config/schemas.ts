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
  companyName: Yup.string()
    .min(5, 'Company Name must have minimum 5 characters')
    .required('This field cannot be empty'),
  logo: Yup.string().url('Invalid URL').required('This field cannot be empty'),
  longDescription: Yup.string().min(
    5,
    'Long Description must have minimum 5 characters',
  ),
  shortDescription: Yup.string()
    .min(5, 'Short Description must have minimum 5 characters')
    .required('This field cannot be empty'),
  title: Yup.string()
    .min(3, 'Title must have minimum 3 characters')
    .required('This field cannot be empty'),
});

export const addJobSchema = Yup.object({
  companyName: Yup.string()
    .min(5, 'Company Name must have minimum 5 characters')
    .required('This field cannot be empty'),
  logo: Yup.string().min(3, 'Logo must have minimum 3 characters'),
  longDescription: Yup.string().min(
    5,
    'Long Description must have minimum 5 characters',
  ),
  shortDescription: Yup.string()
    .min(5, 'Short Description must have minimum 5 characters')
    .required('This field cannot be empty'),
  title: Yup.string()
    .min(3, 'Title must have minimum 3 characters')
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
