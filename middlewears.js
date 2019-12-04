import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
export const localsMiddlewear = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.mRoutes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
