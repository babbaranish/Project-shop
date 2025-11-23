import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addItem } from '../../redux/cart/cart.actions';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { selectIsItemInWishlist } from '../../redux/wishlist/wishlist.selectors';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
  WishlistButton
} from './collection-item.styles';

const CollectionItem = ({ item, addItem, addToWishlist, removeFromWishlist, isInWishlist }) => {
  const { name, price, imageUrl } = item;

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(item);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl} />
      <WishlistButton onClick={handleWishlistClick} isInWishlist={isInWishlist}>
        {isInWishlist ? '❤️' : '🤍'}
      </WishlistButton>
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isInWishlist: selectIsItemInWishlist(ownProps.item.id)(state)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  addToWishlist: item => dispatch(addToWishlist(item)),
  removeFromWishlist: item => dispatch(removeFromWishlist(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionItem);
