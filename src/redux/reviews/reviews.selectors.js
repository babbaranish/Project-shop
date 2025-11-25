import { createSelector } from 'reselect';

const selectReviews = state => state.reviews;

export const selectProductReviews = productId => createSelector(
  [selectReviews],
  reviews => reviews.reviewsByProduct[productId] || []
);

export const selectProductAverageRating = productId => createSelector(
  [selectProductReviews(productId)],
  reviews => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }
);
