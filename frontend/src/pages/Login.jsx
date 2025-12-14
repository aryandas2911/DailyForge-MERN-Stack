import React from "react";

const Login = () => {
  return (
    <form
      className="
        surface-bg px-10 py-15 rounded-2xl
        w-full max-w-sm
        flex flex-col gap-6
      "
    >
      <div className="text-center space-y-1 mb-3">
        <h1 className="text-3xl font-bold text-main">Login</h1>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-main">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="user@email.com"
          required
          className="
            w-full px-3 py-2.5
            text-sm
            surface-bg
            border-soft
            rounded-sm
            shadow-xs
          "
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-main">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          required
          className="
            w-full px-3 py-2.5
            text-sm
            surface-bg
            border-soft
            rounded-base
            shadow-xs
          "
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary cursor-pointer w-full mt-2"
      >
        Login
      </button>

      <p className="text-center text-sm text-muted">
        Don't have an account?{" "}
        <span className="text-main font-medium cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </form>
  );
};

export default Login;
