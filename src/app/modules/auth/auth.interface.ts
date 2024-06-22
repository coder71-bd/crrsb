import { USER_ROLE } from "../user/user.const";

export interface ISignupUser {
  name: string;
  email: string;
  role: USER_ROLE;
  password: string;
  phone: string;
  address: string;
}
