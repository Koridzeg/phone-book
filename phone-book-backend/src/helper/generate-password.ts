import crypto from "crypto";
import { IUser } from "../interfaces/user.model";

export const generatePasswordReset = (user: IUser) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);


  return { resetToken, resetPasswordToken, resetPasswordExpires };
};
