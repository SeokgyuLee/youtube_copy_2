import express from "express";
import routes from "../routes";
import {
  videosCtrller,
  videoDetailCtrller,
  editVideoCtrller,
  deleteVideoCtrller,
  getUploadCtrller,
  postUploadCtrller
} from "../controllers/videoController";
import { uploadVideo } from "../middlewears";

const videoRouter = express.Router();

videoRouter.post(routes.upload, uploadVideo, postUploadCtrller);
videoRouter.get(routes.upload, getUploadCtrller);

videoRouter.get(routes.videos, videosCtrller);
videoRouter.get(routes.editVideo, editVideoCtrller);
videoRouter.get(routes.deleteVideo, deleteVideoCtrller);
videoRouter.get(routes.videoDetail(), videoDetailCtrller);
export default videoRouter;
