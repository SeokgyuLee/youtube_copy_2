import express from "express";
import routes from "../routes";
import {
  editProfileCtrller,
  changePasswordCtrller,
  userDetailCtrller
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfileCtrller);
userRouter.get(routes.changePassword, onlyPrivate, changePasswordCtrller);
userRouter.get(routes.userDetail(), userDetailCtrller);

export default userRouter;
