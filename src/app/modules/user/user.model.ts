/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { FilterQuery, Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { USER_ROLE } from "./user.const";
import config from "../../config";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
      default: function () {
        return uuidv4();
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (query: FilterQuery<IUser>) {
  return await User.findOne({ ...query }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("User", userSchema);
