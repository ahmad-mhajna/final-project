const checkPermissions = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.status(401).send("Not enough permissions");
};
module.exports = checkPermissions;
