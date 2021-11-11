import React, { useState } from "react";
import { useContext } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./loginpage.css"
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ title }) => {
  const { currentUsers, setCurrentUsers } = useContext(CurrentUserContext);

  const onSubmit = (values, { setSubmitting }) => {
    // setTimeout(() => {
    //   console.log("Logging in", values);
    //   setSubmitting(false);
    // }, 500);
    //khi submit, formik tự động set submit=true => sau khi submit chuyển setsubmitting=false
    // setSubmitting(false);

    console.log("value: ", values);
    axios.get("https://60dff0ba6b689e001788c858.mockapi.io/token", {
      email: values.email,
      password: values.password
    }).then(respone => {
      setSubmitting(false);

      setCurrentUsers({
        token: respone.data.token,
        userId: respone.data.userId

      })
      axios.defaults.headers.common['Authorization'] = respone.data.token;
      if (document.getElementById("login-success"))
        document.getElementById("login-success").hidden = false;

      document.getElementById("login").hidden = true;
      document.getElementById("logout").hidden = false;
    })
  }

  console.log("currentUsers: ", currentUsers);

  const initialValues = { email: "", password: "" }

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = "Invalid email address.";
    }
    const passwordRegex = /(?=.*[0-9])/;
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Invalid password. Must contain one number.";
    }
    return errors;
  }

  return (
    <div className="login-form">
      < Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {
          ({
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              {title && <p style={{ textAlign: "center" }}>{title}</p>}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email && "error"}
              />
              {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password && "error"}
              />
              {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
              <button type="submit">
                Login
              </button>
              <h3 id="login-success"
                hidden={true}
                style={{ color: "green" }}>
                Login success</h3>
              <p>Don't have an account<Link to="/signup/" style={{ margin: 5, color: "blue" }}>sign up?</Link></p>
            </form>
          )
        }
      </Formik >
    </div>
  )
};
export default LoginPage;