const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const mongoose = require('mongoose');


// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new review
router.post('/', async (req, res) => {
    const review = new Review({
        bookTitle: req.body.bookTitle,
        author: req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
    });
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a review
router.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (req.body.bookTitle) review.bookTitle = req.body.bookTitle;
        if (req.body.author) review.author = req.body.author;
        if (req.body.rating) review.rating = req.body.rating;
        if (req.body.reviewText) review.reviewText = req.body.reviewText;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (err) {
        console.error('Error in PATCH route:', err);
        res.status(500).json({ message: 'Server error while updating review.' });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Use deleteOne() or findByIdAndDelete()
        await Review.deleteOne({ _id: req.params.id });
        res.json({ message: 'Review deleted successfully.' });
    } catch (err) {
        console.error('Error in DELETE route:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error while deleting review.' });
    }
});

module.exports = router;
