"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { DevTool } from "@hookform/devtools";
import { useActionState, useEffect } from "react";
import { subjectInputs, subjectSchema } from "src/lib/formValidationSchemas";
import { createSubject } from "src/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
//since there are multiple schemas, so we shift all the schemas to @/lib/formValidationSchemas.ts
// const schema = z.object({
//   name: z
//     .string()
//     .min(1, { message: "Name must be at least 1 characters long" })
// });

// type inputs = z.infer<typeof schema>;

let renderCount = 0;

const SubjectForm = ({
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
  } = useForm<subjectInputs>({
    defaultValues: {
      name: data?.name || "",
    },
    // mode: "onBlur",
    resolver: zodResolver(subjectSchema),
  });
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState;
  const watchedValues = watch();

  const initialState = {
    success: false,
    error: false,
  };

  //Flow of the backend when user presses the submit button
  //Clicks on submit button
  //formAction is called
  //formAction will do its action, which is it will call the fist parameter of useActionState, which is createSubject
  //now, the second parameter of useActionState is basically the initial state, and this is capable of keeping track of the state of the form
  //so, if the form is submitted successfully, then the state will be updated to the success state
  //if the form is not submitted successfully, then the state will be updated to the error state
  //but to use the state inside of our action, we need to pass the state as the first parameter of the createSubject function
  const [state, formAction] = useFormState(createSubject, initialState);


  //Submitting the form will send the data to the server and save it inside the database using prisma
  //We will use nextjs server actions to do this
  const onSubmit = handleSubmit((data: subjectInputs) => {
    console.log("Form submitted", data);
    formAction(data); //formAction has the same signature as the createSubject function
  });

  const handleGetValues = () => console.log("Get Values", getValues());

  // Dirty, Valid, Submitting
  // console.log("Is Dirty? ", isDirty);
  // console.log("Is Valid? ", isValid);
  // console.log("Is Submitting? ", isSubmitting);

  //WATCHING THE VALUES
  // useEffect(() => {
  //   const subscription = watch((value) => console.log(value));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful]);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        autoComplete="false"
      >
        {/* TITLE */}
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new Subject" : "Update Subject"}
        </h1>
        {/* form rendering counter */}
        {/* <h1>Form({renderCount / 2})</h1> */}
        {/* AUTHENTICATION */}
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-400">Authentication details</span>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputField
              label="Subject Name"
              register={register}
              name="name"
              error={errors?.name}
            />
          </div>
          {state.error && <span className="text-red-500">Something went wrong!</span>}
          <div className="flex flex-col justify-end gap-4 md:flex-row">
            <button
              className="mt-2 w-1/4 rounded-md bg-rose-500 px-4 py-2 font-medium text-white"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </button>
            {/* Get the current values of the form
            <button
              className="mt-2 w-1/4 rounded-md bg-amber-500 px-4 py-2 font-medium text-black"
              type="button"
              onClick={handleGetValues}
            >
              Get Values
            </button> */}
            <button
              className="mt-2 w-1/4 rounded-md bg-blue-500 px-4 py-2 font-medium text-white disabled:opacity-50"
              type="submit"
              disabled={!isDirty}
            >
              {type === "create" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SubjectForm;
