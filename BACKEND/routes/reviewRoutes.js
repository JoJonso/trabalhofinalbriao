const express = require('express');
const controller = require('../controllers/reviewController');
const router = express.Router();


router.get('/listReviews',controller.listReviews);
router.post('/postReview',controller.postReviews);
router.put('/updateReview/:id',controller.updateReviews);
router.delete('/deleteReview/:id',controller.deleteReviews);

module.exports = router;