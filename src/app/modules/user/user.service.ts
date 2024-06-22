import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: Partial<IUser>) => {
  const user = await User.create(payload);
  return user;
};

export const UserServices = {
  createUserIntoDB,
};
