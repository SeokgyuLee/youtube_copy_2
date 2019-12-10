import passport from "passport";
import GithubStrategy from "passport-github";
import mongUser from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(mongUser.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
// 쿠키에게 user id 만 보내줄 것이라고 말해주는 것.
passport.serializeUser((mongUser, done) => done(null, mongUser));
passport.deserializeUser((mongUser, done) => done(null, mongUser));
