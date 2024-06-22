import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const signupUser = catchAsync(async (req, res) => {
  const user = await AuthServices.signupUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signed up successfully",
    data: {
      user,
    },
  });
});

export const AuthControllers = {
  signupUser,
};
