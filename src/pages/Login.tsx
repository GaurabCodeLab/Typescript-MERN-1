import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { usePersonLoginMutation } from "../redux/api/personApi";
import { loggedInPerson } from "../redux/slices/personSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [personLogin, { isLoading }] = usePersonLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [customError, setCustomError] = useState<string>("");
  const personDetails = useSelector(
    (state: RootState) => state.person.personDetails,
  );

  useEffect(() => {
    if (personDetails) {
      navigate("/dashboard");
    }
  }, [personDetails, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    setCustomError("");
    try {
      const personDetails = await personLogin(data).unwrap();
      dispatch(loggedInPerson(personDetails.data));
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setCustomError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center pt-9 min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded px-3 py-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded px-3 py-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-800 text-white py-2 rounded font-semibold hover:bg-blue-900 cursor-pointer ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {customError && (
            <p className="text-red-600 mt-3 text-center">{customError}</p>
          )}
        </form>
        <p className="mt-4 text-center">
          Not registered?{" "}
          <Link to="/registration" className="text-blue-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
