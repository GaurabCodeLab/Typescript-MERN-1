import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { User } from "../types/user";
import { useCreateUserMutation } from "../redux/api/userApi";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<User>();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const { data: userDetails } = await createUser(data);
      if (userDetails) {
        Swal.fire({
          icon: "success",
          text: `user name ${data?.firstName} created successfully`,
        }).then((result) => {
          if (result.isConfirmed) {
            reset();
            navigate("/dashboard");
          }
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.log("Error in creating new user: " + errorMessage);
    }
  };

  const inputStyle = (field: keyof User) =>
    `border rounded-md h-7 ps-2 mt-1 bg-white ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="w-[70%] mx-auto mt-3 bg-gray-100 px-10 py-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-2 text-blue-800">Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
          <div className="col-span-1">
            <div className="w-full flex flex-col">
              <label htmlFor="firstName" className="me-0">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className={inputStyle("firstName") + "py-2"}
                maxLength={30}
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "minimum 2 characters",
                  },
                })}
              />
              {errors.firstName &&
                typeof errors.firstName.message === "string" && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full flex flex-col">
              <label htmlFor="lastName" className="me-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                maxLength={30}
                className={inputStyle("lastName") + "py-2"}
                {...register("lastName")}
              />
              {errors.lastName && errors.lastName.message === "string" && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full flex flex-col">
              <label htmlFor="email" className="me-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inputStyle("email") + "py-2"}
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label htmlFor="" className="me-2">
                Mobile
              </label>
              <input
                type="text"
                maxLength={10}
                className={inputStyle("mobile") + "py-2"}
                {...register("mobile", {
                  required: "mobile no is required",
                  minLength: {
                    value: 10,
                    message: "mobile no must be 10 digits long",
                  },
                  onChange: (e) =>
                    setValue("mobile", e.target.value.replace(/[^0-9.]/, "")),
                })}
              />
              {errors.mobile && typeof errors.mobile.message === "string" && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex gap-1 flex-col">
              <p>Gender</p>
              <div className="flex gap-6">
                <div className="flex">
                  <label htmlFor="male" className="pe-2 cursor-pointer">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    className="cursor-pointer"
                    {...register("gender", {
                      required: "gender is required",
                    })}
                  />
                </div>
                <div className="flex">
                  <label htmlFor="female" className="pe-2 cursor-pointer">
                    Female
                  </label>
                  <input
                    type="radio"
                    className="cursor-pointer"
                    id="female"
                    value="female"
                    {...register("gender", {
                      required: "gender is required",
                    })}
                  />
                </div>
              </div>
              {errors.gender && typeof errors.gender.message === "string" && (
                <p className="text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <p className="mb-1.5">Hobbies</p>
            <div className="flex gap-3">
              <div className="flex">
                <label htmlFor="cricket" className="pe-2 cursor-pointer">
                  Cricket
                </label>
                <input
                  type="checkbox"
                  id="cricket"
                  className="cursor-pointer"
                  value="cricket"
                  {...register("hobbies", {
                    required: "select at least one hobby",
                  })}
                />
              </div>
              <div className="flex">
                <label htmlFor="coding" className="pe-2 cursor-pointer">
                  Coding
                </label>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  id="coding"
                  value="coding"
                  {...register("hobbies", {
                    required: "select at least one hobby",
                  })}
                />
              </div>
              <div className="flex">
                <label htmlFor="cooking" className="pe-2 cursor-pointer">
                  Cooking
                </label>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  id="cooking"
                  value="cooking"
                  {...register("hobbies", {
                    required: "select at least one hobby",
                  })}
                />
              </div>
            </div>
            {errors.hobbies && typeof errors.hobbies.message === "string" && (
              <p className="text-sm text-red-600 mt-1">
                {errors.hobbies.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <div className="flex flex-col">
              <label htmlFor="selection" className="mb-1">
                Select A Book
              </label>
              <select
                id="selection"
                className="border rounded-md py-1"
                {...register("book", {
                  required: "select a book",
                })}
              >
                <option value="">Select</option>
                <option value="rich-dad-poor-dad">Rich Dad & Poor Dad</option>
                <option value="atomic-habit">Atomic Habits</option>
                <option value="cashflow-quadrant">Cashflow Quadrant</option>
              </select>
              {errors.book && typeof errors.book.message === "string" && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.book.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex mt-4 gap-3">
              <button
                className="border mt-2 px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create User"}
              </button>
              <Link to="/dashboard">
                <button className="border mt-2 px-4 py-2 rounded-lg cursor-pointer bg-black text-white">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
