import routes from "../routes";

export const getJoinCtrller = (req, res) => {
  res.render("joinView", { pageTitle: "join" });
};
export const postJoinCtrller = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("joinView", { pageTitle: "join" });
  } else {
    // To Do : Register User
    // To Do : Log User In
    res.redirect(routes.home);
  }
};
export const getLoginCtrller = (req, res) => {
  res.render("loginView", { pageTitle: "login" });
};
export const postLoginCtrller = (req, res) => {
  res.redirect(routes.home);
};
export const logoutCtrller = (req, res) => {
  // To Do : Process Logout
  res.redirect(routes.home);
};
export const usersCtrller = (req, res) =>
  res.render("usersView", { pageTitle: "users" });
export const userDetailCtrller = (req, res) =>
  res.render("userDetailView", { pageTitle: "user detail" });
export const editProfileCtrller = (req, res) =>
  res.render("editProfileView", { pageTitle: "edit profile" });
export const changePasswordCtrller = (req, res) =>
  res.render("changePasswordView", { pageTitle: "change password" });
