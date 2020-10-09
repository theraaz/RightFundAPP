import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage, Field } from 'formik';
import FormErrorMessage from '../FormErrorMessage/index';
const CustomTextInputFormik = ({
  name,
  placeholder,
  type = 'text',
  as = 'input',
  rows = '1',
  className = '',
}) => (
  <Field name={name}>
    {({ field, form: { touched, errors } }) => (
      <>
        <Form.Control
          {...field}
          isValid={touched[field.name] && !errors[field.name]}
          isInvalid={touched[field.name] && errors[field.name]}
          placeholder={placeholder}
          type={type}
          as={as}
          className={className}
          rows={rows}
        />
        <ErrorMessage name={field.name} render={FormErrorMessage} />
      </>
    )}
  </Field>
);

export default CustomTextInputFormik;
