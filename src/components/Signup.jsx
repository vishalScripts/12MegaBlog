import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { ButtonComp, Input, Logo } from "./index";
import { login as authLogin, login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useUploadPosts from "../hooks/useUploadPosts";

function Signup() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();

  const create = async (data) => {
    setError("");
    setDisabled(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          useUploadPosts(dispatch);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setDisabled(false);
  };
  return (
    <div className="flex items-center justify-center w-[90vw]">
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border hadow-sm shadow-blue-100 border-blue-200`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            {/* <ButtonComp type="submit" className="w-full">
              {disabled ? "Creating Account..." : "Create Account"}
            </ButtonComp> */}

            <div
              id="btn-div"
              className="flex align-middle justify-center w-full"
            >
              <ButtonComp type="submit" className="w-64" disabled={disabled}>
                Create Account
              </ButtonComp>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
