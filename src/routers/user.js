const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const {
  postUser,
  userLogin,
  userLogout,
  userLogoutAll,
  editProfile,
  deleteProfile,
} = require("../controllers/users");
const router = new express.Router();

router.post("/users", postUser);

router.post("/users/login", userLogin);

router.post("/users/logout", auth, userLogout);

router.post("/users/logoutAll", auth, userLogoutAll);

router.put("/users/me", auth, editProfile);

router.delete("/users/me", auth, deleteProfile);

module.exports = router;
