const express = require("express");

const router = express.Router();

const {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  getAverageRating,
} = require("../controllers/reviewController");

router.get("/", getAllReviews);

router.get("/:id", getReviewById);

router.post("/", addReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

router.get(
  "/average/:productId",
  getAverageRating
);

module.exports = router;