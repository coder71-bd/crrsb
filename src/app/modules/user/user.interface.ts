import { FilterQuery, Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: USER_ROLE;
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExists(query: FilterQuery<IUser>): Promise<IUser>;
}
