import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signupValidationSchema),
  AuthControllers.signupUser
);

export const AuthRoutes = router;
