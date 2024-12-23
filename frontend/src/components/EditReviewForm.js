import React, { useState, useEffect } from 'react';
import { updateReview } from '../api';

const EditReviewForm = ({ review, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        reviewText: '',
    });

    useEffect(() => {
        if (review) {
            console.log('Loaded review into form:', review); // Debug: Check the received review
            setFormData({
                bookTitle: review.bookTitle,
                author: review.author,
                rating: review.rating,
                reviewText: review.reviewText,
            });
        }
    }, [review]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!review || !review._id) {
            alert('Review ID not found. Cannot update.');
            return;
        }

        updateReview(review._id, formData)
            .then(() => {
                alert('Review updated successfully.');
                onUpdate();
            })
            .catch((err) => {
                console.error('Error updating review:', err);
                alert('Failed to update review. Please try again.');
            });
    };

    return (

        <div className="p-4 rounded bg-light"
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/1170740815/photo/blue-color-book-cover-pattern.jpg?s=612x612&w=0&k=20&c=_7LGjYC-gDV5-QLuvA4BERjk-mG67JL9M8rnWhirCM4=')", // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>

            <h3 className="mb-4" style={{Color: 'rgba(255, 255, 255, 0.8)' }}>Edit Review</h3>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '1rem', borderRadius: '10px' }}>
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.bookTitle}
                        onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea
                        className="form-control"
                        value={formData.reviewText}
                        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                        required
                    />
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditReviewForm;
