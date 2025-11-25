import ReviewActionTypes from './reviews.types';

export const addReview = (productId, review) => ({
  type: ReviewActionTypes.ADD_REVIEW,
  payload: { productId, review }
});

export const loadReviews = (reviews) => ({
  type: ReviewActionTypes.LOAD_REVIEWS,
  payload: reviews
});
