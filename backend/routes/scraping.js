const {
  scrapeListSkinCondition,
} = require("../controllers/scrappingDataController");

module.exports = [
  {
    method: "GET",
    path: "/api/skin-conditions",
    handler: scrapeListSkinCondition,
  },
];
