import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectWishlistItems } from '../../redux/wishlist/wishlist.selectors';
import { removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { addItem } from '../../redux/cart/cart.actions';

import {
  WishlistPageContainer,
  WishlistTitle,
  WishlistItemsContainer,
  WishlistItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  ActionButtons,
  ActionButton,
  EmptyMessage
} from './wishlist.styles';

const WishlistPage = ({ wishlistItems, removeFromWishlist, addItem }) => (
  <WishlistPageContainer>
    <WishlistTitle>My Wishlist</WishlistTitle>
    {wishlistItems.length === 0 ? (
      <EmptyMessage>
        Your wishlist is empty. Start adding items you love!
      </EmptyMessage>
    ) : (
      <WishlistItemsContainer>
        {wishlistItems.map(item => (
          <WishlistItem key={item.id}>
            <ItemImage src={item.imageUrl} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price}</ItemPrice>
            </ItemDetails>
            <ActionButtons>
              <ActionButton onClick={() => addItem(item)} primary>
                Add to Cart
              </ActionButton>
              <ActionButton onClick={() => removeFromWishlist(item)}>
                Remove
              </ActionButton>
            </ActionButtons>
          </WishlistItem>
        ))}
      </WishlistItemsContainer>
    )}
  </WishlistPageContainer>
);

const mapStateToProps = createStructuredSelector({
  wishlistItems: selectWishlistItems
});

const mapDispatchToProps = dispatch => ({
  removeFromWishlist: item => dispatch(removeFromWishlist(item)),
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
