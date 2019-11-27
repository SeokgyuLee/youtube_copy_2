import express from "express";
import routes from "../routes";
import { homeCtrller, searchCtrller } from "../controllers/videoController";
import {
  logoutCtrller,
  getJoinCtrller,
  postJoinCtrller,
  getLoginCtrller,
  postLoginCtrller
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, homeCtrller);
globalRouter.get(routes.search, searchCtrller);
globalRouter.get(routes.join, getJoinCtrller);
globalRouter.post(routes.join, postJoinCtrller);

globalRouter.get(routes.login, getLoginCtrller);
globalRouter.post(routes.login, postLoginCtrller);

globalRouter.get(routes.logout, logoutCtrller);
export default globalRouter;
