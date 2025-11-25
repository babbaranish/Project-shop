import ReviewActionTypes from './reviews.types';

const INITIAL_STATE = {
  reviewsByProduct: {}
};

const reviewsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReviewActionTypes.ADD_REVIEW:
      const { productId, review } = action.payload;
      const existingReviews = state.reviewsByProduct[productId] || [];

      return {
        ...state,
        reviewsByProduct: {
          ...state.reviewsByProduct,
          [productId]: [...existingReviews, { ...review, id: Date.now(), date: new Date().toISOString() }]
        }
      };

    case ReviewActionTypes.LOAD_REVIEWS:
      return {
        ...state,
        reviewsByProduct: action.payload
      };

    default:
      return state;
  }
};

export default reviewsReducer;
