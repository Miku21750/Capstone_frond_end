const {
  getUser,
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userController");

module.exports = [
  {
    method: "GET",
    path: "/api/users",
    handler: getUser,
  },
  {
    method: "GET",
    path: "/api/users/detail",
    handler: getUserProfile,
  },
  {
    method: "POST",
    path: "/api/register",
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/api/login",
    handler: loginUser,
  },
  {
    method: "PUT",
    path: "/api/users/detail",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 10 * 1024 * 1024,
      },
    },
    handler: updateUserProfile,
  },
];
