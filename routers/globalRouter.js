import express from "express";
import routes from "../routes";
import { homeCtrller, searchCtrller } from "../controllers/videoController";
import {
  joinCtrller,
  loginCtrller,
  logoutCtrller
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, homeCtrller);
globalRouter.get(routes.search, searchCtrller);
globalRouter.get(routes.join, joinCtrller);
globalRouter.get(routes.login, loginCtrller);
globalRouter.get(routes.logout, logoutCtrller);
export default globalRouter;
