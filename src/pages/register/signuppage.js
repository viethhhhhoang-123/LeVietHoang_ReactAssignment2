import axios from "axios";
import "./signuppage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { validate } from "email-validator";
import { bool } from "yup";

const SignUpPage = () => {

    useEffect(() => {
        document.title = "Sign Up Page"
    }, []);

    const [value, setValue] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [touch, setTouch] = useState({
        userName: false,
        email: false,
        password: false,
        continue: false
    })

    const handleOnChange = evt => {
        const name = evt.target.name;
        console.log("name", name);
        setValue({
            ...value,
            [name]: evt.target.value
        })
    }

    const handleOnBlur = evt => {
        setTouch({
            ...touch,
            [evt.target.name]: true
        })
    }

    const handleOnSubmit = evt => {
        evt.preventDefault();
    }

    const validateUserName = userName => {
        if (!userName) {
            return "Required";
        }
    }

    const validateEmail = email => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const passwordRegex = /(?=.*[0-9])/;

    const validatePassword = password => {
        if (!password) {
            return "Required";
        }
        if (password.length < 8) {
            return "Password greater 8 characters"
        }
        if (!passwordRegex.test(value.password)) {
            return "Invalid password. Must contain one number.";
        }
    }

    const validateConfirmPassword = confirmPassword => {
        if (!confirmPassword) {
            return "Required";
        }
        if ((confirmPassword != value.password) && (confirmPassword != null)) {
            return "Passwords don't match!"
        }
    };

    const userNameError = validateUserName(value.userName);
    const emailError = validateEmail(value.email);
    const passwordError = validatePassword(value.password);
    const confirmPasswordError = validateConfirmPassword(value.confirmPassword);

    const formValid = !userNameError && !emailError && !passwordError && !confirmPasswordError;

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={value.userName}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        name="userName"
                    />
                    {touch.userName && (<div className="input-feedback" style={{ color: "red" }}>{userNameError}</div>)}
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={value.email}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        name="email"
                    />
                    {touch.email && (<div className="input-feedback" style={{ color: "red" }}>{emailError}</div>)}
                </div>

                <div>
                    <label for="gender">Choose your gender: </label>
                    <select name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="another">Another...</option>
                    </select>
                </div>
                <br />

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={value.password}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        name="password"
                    />
                    {touch.password && (<div className="input-feedback" style={{ color: "red" }}>{passwordError}</div>)}
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password"
                        // className="form-control"
                        placeholder="Enter confirm password"
                        value={value.confirmPassword}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        name="confirmPassword"
                    />
                    {touch.confirmPassword && (<div className="input-feedback" style={{ color: "red" }}>{confirmPasswordError}</div>)}
                </div>
                <div>
                    <input style={{ width: 30, height: 20}} className="agree" type="checkbox" id="agree" name="agree" value="accept"></input>
                    <label style ={{marginBottom: 200}} className="agree" for="agree">I have read agreement</label>

                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={!formValid}
                >
                    Sign Up
                </button>

                <div className="forgot-password text-right">
                    Already registered<Link to="/login" style={{ margin: 5, color: "blue" }}>sign in?</Link>
                </div>
            </form>
        </div>
    )
}
export default SignUpPage;
