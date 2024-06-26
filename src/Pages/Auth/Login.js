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
    <div className="container--login bg-[#ffffff] rounded-[8px] w-[400px] p-5 relative m-auto pb-10 mt-[15%]">
      <div className="card">
        <div className="panel">
          <h4 className="text-center pb-5">
            Welcome to the <b>POS</b>
          </h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              required
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              type="text"
              className="w-[100%] py-2 px-3"
              placeholder="User Name"
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="text-danger">{formik.errors.username}</span>
            ) : null}
          </div>
          <div className="mb-3 ">
            <div className="input-group flex items-center	justify-center	">
              <input
                type={showPassword ? "text" : "password"}
                className="w-[100%] py-2 px-3"
                required
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
              <span
                className="absolute right-10	"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="text-danger">{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label ml-1" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-[100%] bg-[#3498db] py-2 px-3 mt-3 rounded-[6px] text-[#ffffff]"
          >
            {loading ? "Processing" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
