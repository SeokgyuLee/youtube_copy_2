import express from "express";
import routes from "../routes";
import {
  usersCtrller,
  editProfileCtrller,
  changePasswordCtrller,
  userDetailCtrller
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get(routes.users, usersCtrller);
userRouter.get(routes.editProfile, editProfileCtrller);
userRouter.get(routes.changePassword, changePasswordCtrller);
userRouter.get(routes.userDetail(), userDetailCtrller);

export default userRouter;
