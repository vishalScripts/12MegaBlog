import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { ButtonComp, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { setPosts, addUserPosts } from "../store/postsSlice";
import useUploadPosts from "../hooks/useUploadPosts";
import uploadPosts from "../hooks/uploadPosts";

function Login() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setDisabled(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        console.log("userData from login component", userData);
        if (userData) dispatch(authLogin(userData));
        // uploadPosts(dispatch)
        useUploadPosts(dispatch);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setDisabled(false);
  };

  // const uploaded = useUploadPosts();
  // if (uploaded) {
  //   console.log("uploaded", uploaded);
  // } else {
  //   console.log("uploadedError", uploaded);
  // }

  return (
    <div className="flex items-center justify-center  w-[90vw]">
      <div
        className={`mx-auto w-full max-w-lg bg-white bg rounded-xl p-10 border shadow-sm shadow-blue-100 border-blue-200`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 ">
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
              type="password"
              placeholder="Enter your password "
              label="password"
              {...register("password", {
                required: true,
              })}
            />

            <div
              id="btn-div"
              className="flex align-middle justify-center w-full"
            >
              <ButtonComp type="submit" className="w-64" disabled={disabled}>
                Sign In
              </ButtonComp>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
