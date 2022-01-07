import bcrypt from "bcrypt";
import userModel from "../models/userModel";

export const checkCredentials = async function (
  email: string,
  plainPw: string
) {
  const user = await userModel.findOne({ email });
  if (user) {
    const hashedPw = user.password;
    const isMatch = await bcrypt.compare(plainPw, hashedPw);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  }
};
