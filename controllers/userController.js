import passport from "passport";
import routes from "../routes";
import mongUser from "../models/User";

export const getJoinCtrller = (req, res) => {
  res.render("joinView", { pageTitle: "join" });
};
export const postJoinCtrller = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("joinView", { pageTitle: "join" });
  } else {
    try {
      const userObject = await mongUser({
        name,
        email
      });
      // To Do : Log User In
      await mongUser.register(userObject, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLoginCtrller = (req, res) => {
  res.render("loginView", { pageTitle: "login" });
};
export const postLoginCtrller = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLoginCtrller = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avataRurl, name, email }
  } = profile;
  try {
    const githubUser = await mongUser.findOne({ email });
    if (githubUser) {
      githubUser.githubId = id;
      githubUser.save();
      return cb(null, githubUser);
    }
    const newUser = await mongUser.create({
      email,
      name,
      githubId: id,
      avatarUrl: avataRurl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Facebbok

export const facebookLoginController = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const facebookUser = await mongUser.findOne({ email });
    if (facebookUser) {
      facebookUser.facebookId = id;
      facebookUser.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      facebookUser.save();
      return cb(null, facebookUser);
    }
    const newUser = await mongUser.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};
export const logoutCtrller = (req, res) => {
  // To Do : Process Logout
  req.logout();
  res.redirect(routes.home);
};
export const usersCtrller = (req, res) =>
  res.render("usersView", { pageTitle: "users" });

export const getMe = (req, res) =>
  res.render("userDetailView", { pageTitle: "UserDetail", user: req.user });

export const userDetailCtrller = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await mongUser.findById(id).populate("videos");
    console.log(user);
    res.render("userDetailView", {
      pageTitle: "user detail",
      user
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfileCtrller = (req, res) => {
  res.render("editProfileView", { pageTitle: "edit profile" });
};

export const postEditProfileCtrller = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await mongUser.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const getChangePasswordCtrller = (req, res) => {
  res.render("changePasswordView", { pageTitle: "change password" });
};
export const postChangePasswordCtrller = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/users${routes.changePassword}`);
  }
};
