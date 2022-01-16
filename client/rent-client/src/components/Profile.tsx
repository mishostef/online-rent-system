import React, { useState } from "react";
import { IUser } from "../models/IUser";
import jwt_decode from 'jwt-decode';
import { userRole } from "../enums/Role";
import { Field, Form, Formik, FormikProps, useFormikContext } from "formik";
import axios from "axios";
import { usersAddress } from "../constants";
import { getCookieJWTInfo } from "../services/userservice";

interface IUserFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // role:userRole
}

export interface IUserErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}


const validate = (values: IUserFields): IUserErrors => {
  const errors: IUserErrors = {};

  if (!values.firstName) {
    errors.firstName = 'firstName is required';
  }
  if (!values.lastName) {
    errors.password = 'lastName is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  }
  return errors;
}

const Profile = () => {

  const user =getCookieJWTInfo();
  console.log(user);
  const CURRENT_USER: IUserFields = {email:user!.email, password:user!.password, firstName:user!.firstName, lastName:user!.lastName };
  console.log(CURRENT_USER);
  return (<Formik<IUserFields>
    initialValues={CURRENT_USER}
    validate={validate}
    onSubmit={
      async (values, actions) => {
        console.log(values);
        await axios.put(`${usersAddress}/${user!._id}`, values);
        actions.resetForm({
          values: CURRENT_USER,
        });
        setTimeout(() => alert(JSON.stringify(values)), 0)
      }
    }>
    {props => (<MyForm {...props} />)}
  </Formik>)
}

export default Profile;


const MyForm: React.FC<FormikProps<IUserFields>> = props => {
  const { errors, touched, isValidating } = props;
  return (
    <Form>
      
      <Field name="email" placeholder="Email" />
      {touched.email && errors.email && <div className="feedback">{errors.email}</div>}

      <Field name="password" placeholder="Password" />
      {touched.password && errors.password && <div className="feedback">{errors.password}</div>}

      <Field name="firstName" placeholder="firstName" />
      {touched.firstName && errors.firstName && <div className="feedback">{errors.firstName}</div>}

      <Field name="lastName" placeholder="lastName" />
      {touched.lastName && errors.lastName && <div className="feedback">{errors.lastName}</div>}


      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      <DisplayFormikState />
    </Form>
  )
}

export const DisplayFormikState = () => {
  const myprops = useFormikContext();
  return (
    <div style={{ margin: '1rem 0' }}>
      <h3 style={{ fontFamily: 'monospace' }} />
      <pre
        style={{
          color: 'black',
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        <strong>props</strong> = {JSON.stringify(myprops, null, 2)}
      </pre>
    </div>);
}