import express from "express";
import routes from "../routes";
import {
  videosCtrller,
  videoDetailCtrller,
  deleteVideoCtrller,
  getUploadCtrller,
  postUploadCtrller,
  postEditVideoCtrller,
  getEditVideoCtrller
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// Upload Video
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUploadCtrller);
videoRouter.get(routes.upload, onlyPrivate, getUploadCtrller);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetailCtrller);

videoRouter.get(routes.videos, videosCtrller);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideoCtrller);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideoCtrller);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideoCtrller);

export default videoRouter;
