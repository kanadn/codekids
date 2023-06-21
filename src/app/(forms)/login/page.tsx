"use client"

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FormValues } from "../_forms/form-values";
import joinClasses from "@/util/joinClasses";

function ErrorNote({ message }: { message: string }) {
  return <div className="text-sm py-1 text-red-500">{message}</div>;
}

type LoginFormValues = { long: boolean } & FormValues;

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
      /*
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(
        /^(?!.*__)[a-zA-Z0-9_]+$/,
        "Username cannot have two consecutive underscores"
      )
      .test(
        "prefix_suffix",
        "Username cannot start or end with an underscore",
        (username) => {
          return username.charAt(0) !== "_" 
            && username.charAt(username.length) !== "_";
        }
      )
      .matches(
        /^(?!_)(?!.*_{2})[a-zA-Z0-9_]+(?<!_)$/,
        "Username must only contain alphanumeric characters or underscores"
      ),
      */
    password: yup.string().required("Password is required"),
    long: yup.bool()
  })
  .required();

// TODO: determine if we should put all of this inside of a "form page" of sorts?
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ 
    resolver: yupResolver(validationSchema)  
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="container mx-auto flex flex-col justify-center">
      {/* action is temp. -- need to replace with onSubmit later: */}
      <form onSubmit={onSubmit}>
        <div className="w-80 mx-auto">
          <div className="[&>*]:pb-2">
            <div>
              <p>Username</p>
              <input
                {...register("username")}
                className={joinClasses(
                  "p-1 w-full rounded-md shadow-black drop-shadow-lg",
                  errors.username && "border border-red-500"
                )}
              />

              { errors.username?.message &&
                <ErrorNote message={errors.username.message} /> 
              }
            </div>

            <div>
              <p>Password</p>
              <input
                type="password"
                {...register("password")}
                className={joinClasses(
                  "p-1 w-full rounded-md shadow-black drop-shadow-lg",
                  errors.password && "border border-red-500"
                )}
              />

              { errors.password?.message &&
                <ErrorNote message={errors.password.message} /> 
              }
            </div>

            <div>
              <input 
                type="checkbox"
                {...register("long")}
                className="mr-1"
              />
              <span className="text-sm">
                Remember me for 7 days
              </span>
            </div>
          </div>

          <div className="text-center">
            <input 
              type="submit"
              className="w-auto py-1 px-12 text-white bg-blue-500 shadow-blue-500/50 shadow-lg rounded-md" 
            />
          </div>
        </div>
      </form>
    </div>
  );
}
