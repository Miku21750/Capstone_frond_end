const {
  detectSkinController,
  getDataSkinController,
  getDataUserSkinController,
  deletePhotoController,
} = require("../controllers/detectSkinController");

module.exports = [
  {
    method: "POST",
    path: "/api/detect-skin",
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 10485760,
      },
      auth: "jwt",
    },
    handler: detectSkinController,
  },
  {
    method: "GET",
    path: "/api/photos",
    handler: getDataSkinController,
  },
  {
    method: "GET",
    path: "/api/users/dataScans",
    handler: getDataUserSkinController,
  },
  {
    method: "DELETE",
    path: "/api/photos/{id}",
    options: {
      auth: "jwt",
    },
    handler: deletePhotoController,
  },
];