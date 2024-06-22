import { z } from "zod";
import { USER_ROLE } from "./user.const";
import { makeOptionalSchema } from "../../utils/validation";

const userValidations = {
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .max(255, {
      message: "Name is too long. It must be less than 255 characters.",
    }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Invalid email format. Please provide a valid email address.",
    }),
  role: z.enum(Object.values(USER_ROLE) as [USER_ROLE], {
    message: `Invalid role. Role must be one of these values: ${Object.values(USER_ROLE).join(", ")}`,
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .min(6, {
      message: "Password is too short. It must be at least 6 characters.",
    })
    .max(255, {
      message: "Password is too long. It must be less than 255 characters.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number is too short. It must be at least 10 characters.",
    })
    .max(15, {
      message: "Phone number is too long. It must be less than 15 characters.",
    }),
  address: z
    .string()
    .min(1, {
      message: "Address is required.",
    })
    .min(3, {
      message: "Address is too short. It must be at least 3 characters.",
    }),
};

const createUserValidationSchema = z.object({
  body: z.object(userValidations),
});

const updateUserValidationSchema = z.object({
  body: z.object(makeOptionalSchema(userValidations)),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
