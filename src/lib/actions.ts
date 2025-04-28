//This file will contain all the actions that will be used in the app
//We will use the server actions to create, update, delete and get data from the database

"use server"

import { revalidatePath } from "next/cache";
import { subjectInputs } from "./formValidationSchemas";
import { prisma } from "./prisma";

type CurrentState = {
  success: boolean;
  error: boolean;
};

export const createSubject = async (
  currentState: CurrentState,
  formData: subjectInputs,
) => {
  try {
    await prisma.subject.create({
      data: { name: formData.name },
    });

    revalidatePath("/list/subjects");
    return {
      success: true,
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
    };
  }
};
