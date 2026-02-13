'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
    contentType: 'tool' | 'blog';
    contentId: string;
    onReviewSubmitted?: () => void;
}

export default function ReviewForm({ contentType, contentId, onReviewSubmitted }: ReviewFormProps) {
    const { user, signInWithGoogle } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('Please sign in to post a review');
            return;
        }

        if (!comment.trim()) {
            setError('Please write a comment');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content_type: contentType,
                    content_id: contentId,
                    rating,
                    comment: comment.trim(),
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit review');
            }

            // Reset form
            setComment('');
            setRating(5);

            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err: any) {
            setError(err.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className={styles.signInPrompt}>
                <p>Sign in to leave a review</p>
                <button onClick={signInWithGoogle} className="btn btn-primary">
                    🔐 Sign in with Google
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
            <h3>Write a Review</h3>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.ratingSection}>
                <label>Your Rating</label>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`${styles.star} ${star <= (hoveredRating || rating) ? styles.starFilled : ''}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.commentSection}>
                <label htmlFor="comment">Your Review</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={contentType === 'tool' ? 'Share your experience with this tool...' : 'What did you think about this post?'}
                    rows={5}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Post Review'}
            </button>
        </form>
    );
}
