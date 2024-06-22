import { UserServices } from "../user/user.service";
import { ISignupUser } from "./auth.interface";

const signupUser = async (payload: ISignupUser) => {
  return UserServices.createUserIntoDB(payload);
};

export const AuthServices = {
  signupUser,
};
