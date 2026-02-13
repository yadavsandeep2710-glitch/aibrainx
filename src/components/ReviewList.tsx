'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import styles from './ReviewList.module.css';

interface Review {
    id: string;
    user_email: string;
    user_name: string | null;
    user_avatar: string | null;
    rating: number;
    comment: string;
    created_at: string;
    user_id: string;
}

interface ReviewListProps {
    contentType: 'tool' | 'blog';
    contentId: string;
}

export default function ReviewList({ contentType, contentId }: ReviewListProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/reviews?content_type=${contentType}&content_id=${contentId}`);
            if (!response.ok) throw new Error('Failed to fetch reviews');

            const data = await response.json();
            setReviews(data.reviews || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [contentType, contentId]);

    const handleDelete = async (reviewId: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete review');

            await fetchReviews(); // Refresh the list
        } catch (err: any) {
            alert(err.message || 'Failed to delete review');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const renderStars = (rating: number) => {
        return (
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`${styles.star} ${star <= rating ? styles.starFilled : ''}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    if (loading) {
        return <div className={styles.loading}>Loading reviews...</div>;
    }

    return (
        <div className={styles.reviewList}>
            {reviews.length > 0 && (
                <div className={styles.reviewStats}>
                    <div className={styles.avgRating}>
                        <span className={styles.avgNumber}>{averageRating}</span>
                        {renderStars(Math.round(parseFloat(averageRating)))}
                        <span className={styles.reviewCount}>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                    </div>
                </div>
            )}

            {error && <div className={styles.error}>{error}</div>}

            {reviews.length === 0 && !error && (
                <div className={styles.noReviews}>
                    <p>No reviews yet. Be the first to share your thoughts!</p>
                </div>
            )}

            <div className={styles.reviews}>
                {reviews.map((review) => (
                    <div key={review.id} className={styles.review}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.userInfo}>
                                <img
                                    src={review.user_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user_email)}&background=6366f1&color=fff`}
                                    alt={review.user_name || 'User'}
                                    className={styles.avatar}
                                />
                                <div>
                                    <div className={styles.userName}>{review.user_name || review.user_email.split('@')[0]}</div>
                                    <div className={styles.reviewDate}>{formatDate(review.created_at)}</div>
                                </div>
                            </div>
                            <div className={styles.reviewMeta}>
                                {renderStars(review.rating)}
                                {user?.id === review.user_id && (
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className={styles.deleteBtn}
                                        aria-label="Delete review"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className={styles.comment}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
