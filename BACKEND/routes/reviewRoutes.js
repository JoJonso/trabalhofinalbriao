import express from "express";
import reviewController from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", reviewController.listReviews);
router.post("/", reviewController.postReviews);
router.put("/:id", reviewController.updateReviews);
router.delete("/:id", reviewController.deleteReviews);

export default router;
