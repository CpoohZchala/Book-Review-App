import React, { useState } from 'react';
import { createReview } from '../api';

const AddReviewForm = () => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        reviewText: '',
    });

    const handleStarClick = (ratingValue) => {
        setFormData({ ...formData, rating: ratingValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createReview(formData).then(() => window.location.reload());
    };

    return (
        <div
            className="p-4 rounded bg-light"
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/1170740815/photo/blue-color-book-cover-pattern.jpg?s=612x612&w=0&k=20&c=_7LGjYC-gDV5-QLuvA4BERjk-mG67JL9M8rnWhirCM4=')", // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '1rem', borderRadius: '10px' }}>
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Book Title"
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
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${formData.rating >= star ? 'selected' : ''}`}
                                onClick={() => handleStarClick(star)}
                                style={{
                                    fontSize: '2rem',
                                    color: formData.rating >= star ? 'gold' : 'gray',
                                    cursor: 'pointer',
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea
                        className="form-control"
                        placeholder="Write your review"
                        value={formData.reviewText}
                        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Review</button>
            </form>
        </div>
    );
};

export default AddReviewForm;
