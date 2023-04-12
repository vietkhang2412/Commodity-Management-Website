const checkSignin = (req, res, next) => {
  if (req.session.userid) {
    next();
  } else {
    return res.redirect("/");
  }
};

const checkNoSignin = (req, res, next) => {
  if (!req.session.userid) {
    next();
  } else {
    res.redirect("/home");
  }
};

// const checkSignin = (req, res, next) => {
//   if (req.session.userid) {
//     next();
//   }
// };
module.exports = {
  checkSignin,
  checkNoSignin,
};
