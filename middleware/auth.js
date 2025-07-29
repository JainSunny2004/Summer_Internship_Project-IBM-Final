const requireAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash("error", "Please log in to access this page");
  res.redirect("/auth/login");
};

const requireGuest = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  res.redirect("/");
};

module.exports = {
  requireAuth,
  requireGuest,
};
