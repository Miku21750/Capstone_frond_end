const {
  getFeedback,
  submitFeedback,
} = require("../controllers/feedbackController");

module.exports = [
  {
    method: "GET",
    path: "/api/feedback",
    handler: getFeedback,
  },
  {
    method: "POST",
    path: "/api/feedback",
    handler: submitFeedback,
  },
];
