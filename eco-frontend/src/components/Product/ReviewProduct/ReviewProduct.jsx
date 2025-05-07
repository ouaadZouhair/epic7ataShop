import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, addReviews } from '../../../redux/slice/ReviewsSlice';
import { BsInfoCircleFill, BsStarFill, BsStar } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const ReviewProduct = ({ productId }) => {
    const dispatch = useDispatch();
    const { review, loading, error } = useSelector(state => state.review);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [formError, setFormError] = useState('');

    useEffect(() => {
        dispatch(fetchReviews(productId));
    }, [dispatch, productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            setFormError('Please select a rating');
            return;
        }
        
        if (!reviewText.trim()) {
            setFormError('Please write a review');
            return;
        }

        setFormError('');
        
        try {
            await dispatch(addReviews({
                productId,
                reviewData: {
                    rating,
                    review: reviewText
                }
            })).unwrap();
            
            setRating(0);
            setReviewText('');
        } catch (error) {
            console.error('Failed to submit review:', error);
            setFormError(error.message || 'Failed to submit review');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading && review.length === 0) {
        return <div className="text-center py-8">Loading reviews...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">Error: {error}</div>;
    }

    return (
        <section className='w-[95%] lg:w-[80%] mx-auto my-10'>
            <div className='flex items-center mb-12'>
                <BsInfoCircleFill className="text-3xl text-blue-500 mr-3" />
                <h1 className="text-3xl font-bold text-gray-800 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r from-blue-500 to-blue-300">
                    Customer Reviews
                </h1>
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-10">
                <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <span className="mr-2 text-gray-700">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="text-2xl focus:outline-none"
                            >
                                {star <= rating ? (
                                    <BsStarFill className="text-yellow-400" />
                                ) : (
                                    <BsStar className="text-gray-300" />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="mb-4">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            rows="4"
                            required
                        />
                    </div>
                    {formError && <p className="text-red-500 mb-3">{formError}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? 'Submitting...' : (
                            <>
                                <FiSend className="text-xl mr-2" />
                                Submit Review
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">
                    Customer Reviews ({review.length})
                </h2>

                {review.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                ) : (
                    review.map((review) => (
                        <div key={review._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg uppercase">
                                    {review.user?.fullName?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-gray-900">
                                            {review.user?.fullName || 'Anonymous'}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star}>
                                                {star <= review.rating ? (
                                                    <BsStarFill className="text-yellow-400 inline" />
                                                ) : (
                                                    <BsStar className="text-gray-300 inline" />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.review}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ReviewProduct;