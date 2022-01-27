if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { User } = require("./models");

const express = require("express");
const Controller = require("./controllers");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");
const methodOverride = require("method-override");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.get("/", checkAuthenticated, Controller.userProfileList);
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
initializePassport(
  passport,
  (email) => User.findOne({ where: { email: email } }),
  (id) => User.findOne({ where: { id } })
);
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.post("/register", checkNotAuthenticated, (req, res) => {
  const { password, name, email } = req.body;
  // console.log(password)
  const hashedPassword = bcrypt
    .hash(req.body.password, 10)
    .then((data) => {
      // console.log(data)
      return User.create({
        username: name,
        email,
        password: data,
      });
    })
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => {
      res.send(err);
    })
    .catch(() => {
      res.redirect("/register");
    });
});

app.get("/doctorList", Controller.doctorList);
app.get(
  "/appointment/:UserId/doctors/:DoctorId",
  Controller.confirmAppointment
);
app.get("/userProfileList", Controller.userProfileList);
app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

async function checkAuthenticated(req, res, next) {
  // let {email, password} = req.body
  const x = await req.isAuthenticated();
  console.log(x);
  if (x) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
