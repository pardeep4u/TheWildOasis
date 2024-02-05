import React, { useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mutate, isPending] = useLogin({ email, password });

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter both Username and Password.", {
        position: "top-center",
      });
      return;
    }
    mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('../public/banner100.png')] bg-center bg-repeat-x bg-contain">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 p-4 bg-yellow-50 text-sm text-gray-500 border border-yellow-300 rounded">
            <strong>Test credentials:</strong> <br />
            <strong>Email:</strong> pardeepkumar@gmail.com <br />
            <strong>Password:</strong> akm123
          </div>

          <button
            type="button"
            className={classNames(
              "px-4 py-2 rounded-md hover:bg-blue-600",
              "bg-blue-500 text-white",
              { "opacity-50 cursor-not-allowed": isPending }
            )}
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
