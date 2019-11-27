import routes from "../routes";
import mongoVideo from "../models/Video";

export const homeCtrller = async (req, res) => {
  try {
    const videos = await mongoVideo.find({});

    res.render("homeView", { pageTitle: "home", videos });
  } catch (error) {
    console.log(error);
    res.render("homeView", { pageTitle: "home", videos: [] });
  }
};

export const searchCtrller = (req, res) => {
  console.log(req.query.term);
  const {
    query: { term: searchingBy }
  } = req;
  res.render("searchView", { pageTitle: "search", searchingBy, videos });
};

export const videosCtrller = (req, res) =>
  res.render("videosView", { pageTitle: "video" });

export const getUploadCtrller = (req, res) =>
  res.render("uploadView", { pageTitle: "upload" });

export const postUploadCtrller = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await mongoVideo.create({
    videoFile: path,
    title,
    description: description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetailCtrller = (req, res) =>
  res.render("videoDetailView", { pageTitle: "video detail" });
export const editVideoCtrller = (req, res) =>
  res.render("editVideoView", { pageTitle: "edit video" });
export const deleteVideoCtrller = (req, res) =>
  res.render("deleteVideoView", { pageTitle: "delete video" });
