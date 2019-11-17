import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("videos - screen"));
videoRouter.get(routes.upload, (req, res) => res.send("upload - screen"));
videoRouter.get(routes.videoDetail, (req, res) =>
  res.send("videoDetail - screen")
);
videoRouter.get(routes.editVideo, (req, res) => res.send("editVideo - screen"));
videoRouter.get(routes.deleteVideo, (req, res) =>
  res.send("deleteVideo - screen")
);
export default videoRouter;
