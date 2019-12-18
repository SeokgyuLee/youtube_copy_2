import express from "express";
import routes from "../routes";
import {
  userDetailCtrller,
  getEditProfileCtrller,
  postEditProfileCtrller,
  getChangePasswordCtrller,
  postChangePasswordCtrller
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfileCtrller);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatar,
  postEditProfileCtrller
);
userRouter.get(routes.changePassword, onlyPrivate, getChangePasswordCtrller);
userRouter.post(routes.changePassword, onlyPrivate, postChangePasswordCtrller);

userRouter.get(routes.userDetail(), userDetailCtrller);

export default userRouter;
