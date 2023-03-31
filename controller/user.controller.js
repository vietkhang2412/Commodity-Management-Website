let dataU = [
  {
    id: 1,
    fullname: "Đinh Viết Khang",
    image:
      "https://i.pinimg.com/564x/05/e5/b4/05e5b45f73e55962d59325ee91507011.jpg",
    username: "khangdv",
    passwork: "123",
    email: "Khangloong14@gmail.com",
  },
  {
    id: 2,
    fullname: "Cao Văn Chỉnh",
    image:
      "https://i.pinimg.com/564x/05/e5/b4/05e5b45f73e55962d59325ee91507011.jpg",
    username: "khangdv",
    passwork: "123",
    email: "Khangloong14@gmail.com",
  },
  {
    id: 3,
    fullname: "Đinh Viết Khang",
    image:
      "https://i.pinimg.com/564x/05/e5/b4/05e5b45f73e55962d59325ee91507011.jpg",
    username: "khangdv",
    passwork: "123",
    email: "Khangloong14@gmail.com",
  },
  {
    id: 4,
    fullname: "Đinh Viết Khang",
    image:
      "https://i.pinimg.com/564x/05/e5/b4/05e5b45f73e55962d59325ee91507011.jpg",
    username: "khangdv",
    passwork: "123",
    email: "Khangloong14@gmail.com",
  },
  {
    id: 5,
    fullname: "Đinh Viết Khang",
    image:
      "https://i.pinimg.com/564x/05/e5/b4/05e5b45f73e55962d59325ee91507011.jpg",
    username: "khangdv",
    passwork: "123",
    email: "Khangloong14@gmail.com",
  },
];

const detailUser = (req, res, next) => {
  if (req.session.userid) {
    res.render("user/detailUser", { adminName: req.session.userid });
  }
  res.status(404).end();
};

const listUser = (req, res) => {
  if (req.session.userid) {
    res.render("user/users", {
      dataUser: dataU,
      adminName: req.session.userid,
    });
  }
  res.status(404).end();
};

module.exports = {
  listUser,
  detailUser,
};
