import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { usePersonRegistrationMutation } from "../redux/api/personApi";
import Swal from "sweetalert2";

type RegistrationFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();

  const [personRegistration, { isLoading, error }] =
    usePersonRegistrationMutation();
  const navigate = useNavigate();
  const [customError, setCustomError] = React.useState<string>("");
  const personDetails = useSelector(
    (state: RootState) => state.person.personDetails,
  );

  useEffect(() => {
    if (personDetails) {
      navigate("/dashboard");
    }
  }, [personDetails, navigate]);

  const onSubmit = async (data: RegistrationFormInputs) => {
    setCustomError("");
    try {
      await personRegistration(data).unwrap();
      Swal.fire({
        icon: "success",
        text: "user registered successfully",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (err: any) {
      setCustomError(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center pt-9 min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
          Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded px-3 py-2"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
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
            className={`w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 cursor-pointer ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {customError && (
            <p className="text-red-600 mt-3 text-center">{customError}</p>
          )}
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-700 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
