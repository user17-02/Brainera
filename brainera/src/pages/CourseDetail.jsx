import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import PageHeader from '../components/PageHeader';
import { BookOpen, Users, Clock, Award, CheckCircle, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import styles from './CourseDetail.module.css';
import CoursesStyles from '../components/Courses.module.css'; // For common button styles
import CTA from '../components/CTA';
import AuthContext from '../context/AuthContext'; // Import AuthContext

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com'; // Ensure this matches your backend URL

const CourseDetail = () => {
    const { courseId } = useParams(); // Get courseId from URL
    const navigate = useNavigate();
    const { isLoggedIn, user } = useContext(AuthContext); // Get login state and user info

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loadingEnrollment, setLoadingEnrollment] = useState(true);

    // New states for reviews
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(0); // Assuming 0-5 scale
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    // Accordion state for Lessons/FAQ
    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    // Effect to fetch course details
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setCourse(null); // Course not found
                    }
                    throw new Error('Failed to fetch course details.');
                }
                const data = await response.json();
                setCourse(data);
            } catch (err) {
                console.error('Error fetching course details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]); // Re-run if courseId changes

    // Effect to fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews.');
                }
                const data = await response.json();
                setReviews(data);

                // Calculate average rating and count
                if (data.length > 0) {
                    const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
                    setAverageRating((totalRating / data.length).toFixed(1));
                    setReviewCount(data.length);
                } else {
                    setAverageRating(0);
                    setReviewCount(0);
                }

            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };

        if (courseId) {
            fetchReviews();
        }
    }, [courseId]);

    // Effect to check enrollment status
    useEffect(() => {
        const checkEnrollment = async () => {
            if (!isLoggedIn || !user || !courseId) {
                setIsEnrolled(false);
                setLoadingEnrollment(false);
                return;
            }

            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/enrollments/my-courses`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch enrollment status.');
                }

                const data = await response.json();
                const enrolledCourseIds = data.enrollments.map(enrollment => enrollment.courseId._id);
                setIsEnrolled(enrolledCourseIds.includes(courseId));

            } catch (err) {
                console.error('Error checking enrollment status:', err);
                setError(err.message); // This error is specifically for enrollment check
            } finally {
                setLoadingEnrollment(false);
            }
        };

        checkEnrollment();
    }, [isLoggedIn, user, courseId]); // Re-run if login status, user, or courseId changes

    const handleEnrollNow = () => {
        if (!isLoggedIn) {
            navigate('/login-register'); // Redirect to login/register if not logged in
        } else {
            navigate(`/checkout/${courseId}`); // Proceed to checkout
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        setReviewError(null);

        if (!newReviewText || newReviewRating === 0) {
            setReviewError('Please provide both a rating and a comment.');
            setSubmittingReview(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ rating: newReviewRating, comment: newReviewText }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to submit review.');
            }

            // Clear form and refetch reviews
            setNewReviewText('');
            setNewReviewRating(0);
            // Re-fetch reviews to update the list, including the new one
            const reviewsResponse = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/reviews`);
            const updatedReviews = await reviewsResponse.json();
            setReviews(updatedReviews);

            // Recalculate average rating and count
            if (updatedReviews.length > 0) {
                const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
                setAverageRating((totalRating / updatedReviews.length).toFixed(1));
                setReviewCount(updatedReviews.length);
            } else {
                setAverageRating(0);
                setReviewCount(0);
            }


        } catch (err) {
            console.error('Error submitting review:', err);
            setReviewError(err.message);
        } finally {
            setSubmittingReview(false);
        }
    };


    if (loading || loadingEnrollment) {
        return <p className={styles.loadingMessage}>Loading course details...</p>;
    }

    if (error) {
        return <p className={styles.errorMessage}>Error: {error}</p>;
    }

    if (!course) {
        return <p className={styles.errorMessage}>Course not found.</p>;
    }

    // Determine image source: if it's a relative path, prepend backend URL
    const imageSrc = course.thumbnail && course.thumbnail.startsWith('/')
        ? `${BACKEND_BASE_URL}${course.thumbnail}`
        : course.thumbnail;

    return (
        <>
            <PageHeader title={course.title} breadcrumb="Course Detail" />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <h2 className={styles.courseTitle}>{course.title}</h2>

                            <div className={styles.tabSection}>
                                <h3 className={styles.sectionTitle}>About The Course</h3>
                                <p className={styles.text}>{course.description}</p>
                                {/* Removed course.description2 as it's not in the model */}
                            </div>

                            {/* Lessons Section - only for enrolled students */}
                            {isEnrolled && course.lessons && course.lessons.length > 0 && (
                                <div className={styles.lessonSection}>
                                    <h3 className={styles.sectionTitle}>Course Content</h3>
                                    <div className={styles.accordion}>
                                        {course.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                                            <div key={lesson._id} className={styles.accordionItem}>
                                                <button
                                                    className={styles.accordionHeader}
                                                    onClick={() => toggleItem(index)}
                                                >
                                                    <span>Lesson {lesson.order}: {lesson.title}</span>
                                                    {openItem === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </button>
                                                {openItem === index && (
                                                    <div className={styles.accordionContent}>
                                                        <p>{lesson.content}</p>
                                                        {lesson.videoUrl && (
                                                            <div className={styles.videoWrapper}>
                                                                <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src={lesson.videoUrl}
                                                                    title="Lesson video"
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                ></iframe>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Course Highlights (if applicable from fetched data) */}
                            {/* Assuming highlights are part of description or separate field if added to model */}
                            {/* For now, just a placeholder or remove if not needed */}
                            {/* <div className={styles.highlightSection}>...</div> */}

                            {/* FAQ Section (if applicable from fetched data) */}
                            {/* For now, just a placeholder or remove if not needed */}
                            {/* <div className={styles.faqSection}>...</div> */}

                            {/* Review Section */}
                            <div className={styles.reviewSection}>
                                <h3 className={styles.sectionTitle}>Student Reviews ({reviewCount})</h3>
                                {reviews.length === 0 ? (
                                    <p>No reviews yet. Be the first to review this course!</p>
                                ) : (
                                    <div className={styles.reviewsList}>
                                        {reviews.map(review => (
                                            <div key={review._id} className={styles.reviewItem}>
                                                <div className={styles.reviewHeader}>
                                                    <span className={styles.reviewerName}>{review.studentId.name}</span>
                                                    <span className={styles.reviewRating}>Rating: {review.rating}/5</span>
                                                </div>
                                                <p className={styles.reviewComment}>{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {isLoggedIn && user?.role === 'student' && isEnrolled && (
                                    <div className={styles.reviewFormContainer}>
                                        <h4 className={styles.sectionTitle}>Submit Your Review</h4>
                                        {reviewError && <p className={styles.errorMessage}>{reviewError}</p>}
                                        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="rating">Rating (1-5):</label>
                                                <input
                                                    type="number"
                                                    id="rating"
                                                    min="1"
                                                    max="5"
                                                    value={newReviewRating}
                                                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                                                    required
                                                    className={styles.ratingInput}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="comment">Comment:</label>
                                                <textarea
                                                    id="comment"
                                                    rows="5"
                                                    value={newReviewText}
                                                    onChange={(e) => setNewReviewText(e.target.value)}
                                                    required
                                                    className={styles.commentInput}
                                                ></textarea>
                                            </div>
                                            <button type="submit" disabled={submittingReview} className={CoursesStyles.enrollBtn}>
                                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <div className={styles.previewImage}>
                                    <img src={imageSrc} alt={course.title} onError={(e) => { e.target.onerror = null; e.target.src="/vite.svg"; }} />
                                    {/* PlayCircle overlay can be kept for visual, but won't play anything here without deeper integration */}
                                    <div className={styles.playButton}><PlayCircle size={48} /></div>
                                </div>
                                <div className={styles.priceTag}>${course.price}</div>
                                
                                {isLoggedIn && isEnrolled ? (
                                    <button className={CoursesStyles.goToCourseBtn} onClick={() => navigate('/my-learning')}>Go to Dashboard</button>
                                ) : (
                                    <button className={styles.enrollBtn} onClick={handleEnrollNow}>Enroll Now</button>
                                )}

                                <div className={styles.featuresList}>
                                    <h4 className={styles.featuresTitle}>This Course Includes:</h4>
                                    <ul>
                                        <li><Clock size={18} className={styles.featIcon} /><span>{course.duration} on-demand video</span></li>
                                        <li><BookOpen size={18} className={styles.featIcon} /><span>{course.lessons?.length || 0} Lessons</span></li>
                                        <li><Award size={18} className={styles.featIcon} /><span>Certificate of completion</span></li>
                                        {/* You can add more features dynamically from course data */}
                                    </ul>
                                </div>

                                <div className={styles.instructorParams}>
                                    <span className={styles.instructorName}>{course.instructor?.name || 'N/A'}</span>
                                    <span className={styles.instructorRole}>Instructor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <RelatedCourses /> // Removed for now, can be re-added later with dynamic data */}

            <CTA />
        </>
    );
};

export default CourseDetail;
