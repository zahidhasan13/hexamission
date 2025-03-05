import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const { error, loading, signup } = useSignup();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-sky-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Sign Up for HexaMission
        </h2>
        {error && (
          <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?
          <Link to="/login" className="text-sky-400 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
