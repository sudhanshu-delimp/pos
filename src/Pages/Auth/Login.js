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
      username: Yup.string().required("User name is required"),
      password: Yup.string().required("Password is required"),
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

    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h4 className="text-center text-2xl leading-9 font-extrabold text-gray-900">
            Welcome to the POS
          </h4>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label for="email" className="block text-sm font-medium leading-5  text-gray-700">User name</label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    required
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="User name"
                    id="email"
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="mt-1">
                    <span className="text-red-600">{formik.errors.username}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <label for="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    type={showPassword ? "text" : "password"}
                    className="w-[100%] py-2 px-3"
                    required
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    id="password"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="mt-1">
                    <span className="text-red-600">{formik.errors.password}</span>
                  </div>
                ) : null}
              </div>

              {/* <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                <label for="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
              </div>

              <div className="text-sm leading-5">
                <a href="#"
                  className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </a>
              </div>
            </div> */}

              <div className="mt-8">
                <span className="block w-full rounded-md shadow-sm">
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3498db] hover:[#3498db] focus:outline-none focus:border-[#3498db] focus:shadow-outline-indigo active:bg-[#3498db] transition duration-150 ease-in-out">
                    {loading ? "Processing" : "Sign in"}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

  );
};

export default Login;
