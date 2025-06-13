const path = require("path");

module.exports = [
  {
    method: "GET",
    path: "/images/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "../public/images"),
        redirectToSlash: true,
        index: false,
      },
    },
  },
];
