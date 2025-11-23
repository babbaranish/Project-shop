import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addReview } from '../../redux/reviews/reviews.actions';
import { selectProductReviews, selectProductAverageRating } from '../../redux/reviews/reviews.selectors';

import {
  ReviewsContainer,
  ReviewsTitle,
  AverageRating,
  ReviewForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  ReviewsList,
  ReviewItem,
  ReviewHeader,
  ReviewAuthor,
  ReviewDate,
  ReviewRating,
  ReviewText,
  StarRating
} from './product-reviews.styles';

const ProductReviews = ({ productId, reviews, averageRating, addReview, currentUser }) => {
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      addReview(productId, {
        author: currentUser ? currentUser.displayName : formData.author || 'Anonymous',
        rating: parseInt(formData.rating),
        text: formData.text
      });
      setFormData({ author: '', rating: 5, text: '' });
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <ReviewsContainer>
      <ReviewsTitle>Customer Reviews</ReviewsTitle>
      {reviews.length > 0 && (
        <AverageRating>
          <StarRating>{renderStars(Math.round(averageRating))}</StarRating>
          <span>{averageRating} out of 5 ({reviews.length} reviews)</span>
        </AverageRating>
      )}

      <ReviewForm onSubmit={handleSubmit}>
        <h3>Write a Review</h3>
        {!currentUser && (
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name (optional)"
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Rating</Label>
          <Input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Your Review</Label>
          <TextArea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Share your thoughts about this product..."
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Submit Review</SubmitButton>
      </ReviewForm>

      <ReviewsList>
        {reviews.map(review => (
          <ReviewItem key={review.id}>
            <ReviewHeader>
              <ReviewAuthor>{review.author}</ReviewAuthor>
              <ReviewDate>{new Date(review.date).toLocaleDateString()}</ReviewDate>
            </ReviewHeader>
            <ReviewRating>{renderStars(review.rating)}</ReviewRating>
            <ReviewText>{review.text}</ReviewText>
          </ReviewItem>
        ))}
      </ReviewsList>
    </ReviewsContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  reviews: selectProductReviews(ownProps.productId)(state),
  averageRating: selectProductAverageRating(ownProps.productId)(state),
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  addReview: (productId, review) => dispatch(addReview(productId, review))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
