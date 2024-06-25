import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AuthServices from "../../services/AuthServices";
import { setAccessToken, setUser } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../utils/toast";
import useUtilsFunction from "../../hooks/useUtilsFunction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { catchError } = useUtilsFunction();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      let payload = values;
      try {
        setLoading(true);
        const response = await AuthServices.loginAdmin(payload);
        setLoading(false);
        if (response.token) {
          dispatch(setUser(response));
          dispatch(setAccessToken(response.token));
          notifySuccess("Logged in successfully");
          formik.resetForm();
          navigate("/");
        } else {
          notifyError(response.message);
        }
      } catch (error) {
        const errorMessage = catchError(error);
        setLoading(false);
        notifyError(errorMessage);
      }
    },
  });

  return (
    <div className="container--login pl-5 pr-5">
      <div className="card">
        <div className="panel">
          <h4>
            Welcome to the <b>POS</b>
          </h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <input
              required
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              type="text"
              className="form-control"
              placeholder="User name"
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="text-danger">{formik.errors.username}</span>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                required
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
              <span
                className="input-group-text pass--eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="text-danger">{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {loading ? "Processing" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
