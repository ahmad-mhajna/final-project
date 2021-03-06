const User = require("../models/user");

const postUser = async (req, res) => {
  const user = new User(req.body);
  user.isAdmin = false;

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const userLogin = async (req, res) => {
  try {
    let user;
    let token = req.body.token;
    if (token) {
      user = await User.findByToken(token);
    } else {
      user = await User.findByCredentials(req.body.username, req.body.password);
      token = await user.generateAuthToken();
    }
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const editProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age", "cart"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = {
  postUser,
  userLogin,
  userLogout,
  userLogoutAll,
  editProfile,
  deleteProfile,
};
