const getHome = (req, res) => {
  if (req.session.userid) {
    res.render("home/home", { adminName: req.session.userid });
  }
  res.status(404).end();
};

const postHome = (req, res) => {
  const username = "khangdv";
  const password = "1";

  if (req.body.username == username && req.body.password == password) {
    req.session.userid = req.body.username;
    console.log(req.session);
    res.render("home/home", { adminName: req.session.userid });
  } else {
    res.redirect("/");
  }
};

const getWeblogo = (req, res) => {
  req.session.destroy();
  res.render("home/webLogo");
};

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const getProfile = (req, res) => {
  res.render("home/detailAdmin", { adminName: req.session.userid });
};

module.exports = {
  getHome,
  postHome,
  getWeblogo,
  getLogout,
  getProfile,
};
