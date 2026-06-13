const db = require("../config/db");

// GET ALL REVIEWS
exports.getAllReviews = (req, res) => {
  const sql = "SELECT * FROM product_review";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

// GET REVIEW BY ID
exports.getReviewById = (req, res) => {
  const id = req.params.id;

  const sql =
    "SELECT * FROM product_review WHERE review_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

// ADD REVIEW
exports.addReview = (req, res) => {
  const {
    product_id,
    user_id,
    username,
    rating,
    review_text,
    status,
  } = req.body;

  
  const sql = `
    INSERT INTO product_review
    (product_id,user_id,username,rating,review_text,status)
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      product_id,
      user_id,
      username,
      rating,
      review_text,
      status || "Visible",
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Review Added Successfully",
      });
    }
  );
};

// UPDATE REVIEW
exports.updateReview = (req, res) => {
  const id = req.params.id;

  const {
    product_id,
    user_id,
    username,
    rating,
    review_text,
    status,
  } = req.body;

  const sql = `
    UPDATE product_review
    SET
      product_id=?,
      user_id=?,
      username=?,
      rating=?,
      review_text=?,
      status=?
    WHERE review_id=?
  `;

  db.query(
    sql,
    [
      product_id,
      user_id,
      username,
      rating,
      review_text,
      status,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Review Updated Successfully",
      });
    }
  );
};

// DELETE REVIEW
exports.deleteReview = (req, res) => {
  const id = req.params.id;

  const sql =
    "DELETE FROM product_review WHERE review_id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Review Deleted Successfully",
    });
  });
};

// AVERAGE RATING
exports.getAverageRating = (req, res) => {
  const productId = req.params.productId;

  const sql = `
    SELECT AVG(rating) AS average_rating
    FROM product_review
    WHERE product_id=?
  `;

  db.query(sql, [productId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      product_id: productId,
      average_rating: Number(
        result[0].average_rating
      ).toFixed(2),
    });
  });
};