/* eslint-disable no-console */
import routes from "../routes";
import mongVideo from "../models/Video";
import mongComment from "../models/Comment";

export const homeCtrller = async (req, res) => {
  try {
    const videos = await mongVideo.find({}).sort({ _id: -1 }); // 정렬

    res.render("homeView", { pageTitle: "home", videos });
  } catch (error) {
    console.log(error);
    res.render("homeView", { pageTitle: "home", videos: [] });
  }
};

export const searchCtrller = async (req, res) => {
  console.log("search 컨트롤러 로그");
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await mongVideo.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
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
  const newVideo = await mongVideo.create({
    videoFile: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetailCtrller = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await await mongVideo
      .findById(id)
      .populate("creator")
      .populate("comments");
    console.log(video);
    res.render("videoDetailView", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideoCtrller = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await mongVideo.findById(id);
    // console.log(video);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideoView", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideoCtrller = async (req, res) => {
  console.log("포스트비디오 들어왔다.");
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await mongVideo.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideoCtrller = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await mongVideo.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await mongVideo.findOneAndRemove({ _id: id });
    }

    console.log("성공");
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await mongVideo.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    res.end();
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const Video = await mongVideo.findById(id);
    const newComment = await mongComment.create({
      text: comment,
      creator: user.id
    });
    Video.comments.push(newComment.id);
    Video.save();
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};
