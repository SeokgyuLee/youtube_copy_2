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
import { uploadVideo } from "../middlewears";

const videoRouter = express.Router();

// Upload Video
videoRouter.post(routes.upload, uploadVideo, postUploadCtrller);
videoRouter.get(routes.upload, getUploadCtrller);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetailCtrller);

videoRouter.get(routes.videos, videosCtrller);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideoCtrller);
videoRouter.post(routes.editVideo(), postEditVideoCtrller);

videoRouter.get(routes.deleteVideo(), deleteVideoCtrller);

export default videoRouter;
