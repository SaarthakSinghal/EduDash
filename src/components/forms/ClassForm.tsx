"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => val !== "admin@example.com", {
      message: "Enter a different email address",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "Blood type must be selected",
  }),
  birthday: z.date({ message: "Birthday is required" }),
  sex: z.enum(["male", "female", "other"], {
    message: "Gender must be selected",
  }),
  img: z.instanceof(File, { message: "Image must be selected" }),
});

type inputs = z.infer<typeof schema>;
let renderCount = 0;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  renderCount++;
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    reset,
  } = useForm<inputs>({
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
      firstname: data?.firstname || "",
      lastname: data?.lastname || "",
      phone: data?.phone || "",
      address: data?.address || "",
      bloodType: data?.bloodType || "",
      birthday: data?.birthday || new Date(),
      sex: data?.sex || "",
      img: data?.img || null,
    },
    // mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  // const watchedValues = watch();

  const onSubmit = handleSubmit((data: inputs) =>
    console.log("Form submitted"),
  );

  const handleGetValues = () => console.log("Get Values", getValues());

  /*
console.log("Is Dirty? ", isDirty);
  console.log("Is Valid? ", isValid);
  console.log("Is Submitting? ", isSubmitting);
*/

  // useEffect(() => {
  //   const subscription = watch((value) => console.log(value));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        autoComplete="false"
      >
        {/* TITLE */}
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new Class" : "Update Class"}
        </h1>
        <h1>Form({renderCount / 2})</h1>
        {/* AUTHENTICATION */}
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-400">Authentication details</span>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputField
              label="Username"
              register={register}
              name="username"
              error={errors.username}
            />
            <InputField
              label="Email"
              type="email"
              register={register}
              name="email"
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              register={register}
              name="password"
              error={errors.password}
            />
          </div>
        </div>
        {/* PERSONAL */}
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-400">Personal details</span>
          <div className="flex flex-wrap justify-between gap-4">
            <InputField
              label="Firstname"
              register={register}
              name="firstname"
              error={errors.firstname}
            />
            <InputField
              label="Lastname"
              register={register}
              name="lastname"
              error={errors.lastname}
            />
            <InputField
              label="Phone"
              register={register}
              name="phone"
              error={errors.phone}
            />
            <InputField
              label="Address"
              register={register}
              name="address"
              error={errors.address}
            />
            <InputField
              label="Blood Type"
              register={register}
              name="bloodType"
              error={errors.bloodType}
            />
            <InputField
              label="Birthday"
              type="date"
              register={register}
              name="birthday"
              error={errors.birthday}
            />
            <div className="flex w-full flex-col gap-2 md:max-w-[30%]">
              <label className="text-xs text-gray-500">Sex</label>
              <select
                className="w-full rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
                {...register("sex")}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors?.sex && (
                <p className="text-[10px] text-red-400">{errors.sex.message}</p>
              )}
            </div>
            <div className="mt-3 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-2 py-4 md:max-w-[30%]">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"
                htmlFor="img"
              >
                <Image
                  src="/upload.png"
                  alt="upload icon"
                  width={20}
                  height={20}
                />
                <span className="text-sm">Upload a photo</span>
              </label>
              <input
                type="file"
                id="img"
                {...register("img")}
                className="hidden"
              />
              {errors?.img && (
                <p className="text-[10px] text-red-400">{errors.img.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <button
              className="mt-2 w-1/4 rounded-md bg-blue-500 px-4 py-2 font-medium text-white disabled:opacity-50"
              type="submit"
              disabled={!isDirty}
            >
              {type === "create" ? "Create" : "Update"}
            </button>
            <button
              className="mt-2 w-1/4 rounded-md bg-amber-500 px-4 py-2 font-medium text-black"
              type="button"
              onClick={handleGetValues}
            >
              Get Values
            </button>
            <button
              className="mt-2 w-1/4 rounded-md bg-rose-500 px-4 py-2 font-medium text-white"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ClassForm;
