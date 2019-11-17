import express from "express";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("users- screen"));
userRouter.get(routes.userDetail, (req, res) =>
  res.send("userDetail - screen")
);
userRouter.get(routes.editProfile, (req, res) =>
  res.send("edit profile- screen")
);
userRouter.get(routes.changePassword, (req, res) =>
  res.send("change password- screen")
);

export default userRouter;
