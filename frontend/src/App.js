import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewList from './components/ReviewList';
import AddReviewForm from './components/AddReviewForm';
import EditReviewForm from './components/EditReviewForm';

const App = () => {
    const [editingReview, setEditingReview] = useState(null); // Track the review being edited

    const handleUpdate = () => {
        setEditingReview(null); // Reset editing state after successful update
        window.location.reload(); // Refresh the reviews list
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Book Review App</h1>
            {editingReview ? (
                <EditReviewForm
                    review={editingReview} // Pass the selected review to EditReviewForm
                    onCancel={() => setEditingReview(null)} // Cancel editing
                    onUpdate={handleUpdate} // Callback for successful update
                />
            ) : (
                <>
                    <AddReviewForm />
                    <ReviewList onEdit={setEditingReview} /> {/* Pass the onEdit handler */}
                </>
            )}
        </div>
    );
};

export default App;
