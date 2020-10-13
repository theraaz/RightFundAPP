import React from 'react';
import { FormControl } from 'react-bootstrap';
import { ErrorMessage, Field } from 'formik';
import FormErrorMessage from '../FormErrorMessage';

const CustomSelectFormik = ({ name, children }) => (
  <>
    <Field name={name}>
      {({ field }) => (
        <FormControl as="select" {...field}>
          {children}
        </FormControl>
      )}
    </Field>
    <ErrorMessage name={name} render={FormErrorMessage} />
  </>
);

export default CustomSelectFormik;
