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
    _json: { id, avatar_url, name, email }
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
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const logoutCtrller = (req, res) => {
  // To Do : Process Logout
  req.logout();
  res.redirect(routes.home);
};
export const usersCtrller = (req, res) =>
  res.render("usersView", { pageTitle: "users" });

export const me = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail", user: req.user });
export const userDetailCtrller = (req, res) => {
  res.render("userDetailView", { pageTitle: "user detail" });
};
export const editProfileCtrller = (req, res) =>
  res.render("editProfileView", { pageTitle: "edit profile" });
export const changePasswordCtrller = (req, res) => {
  console.log("컨트롤러 들어옴");
  res.render("changePasswordView", { pageTitle: "change password" });
};
