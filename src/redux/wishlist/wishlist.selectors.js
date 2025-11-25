import { createSelector } from 'reselect';

const selectWishlist = state => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlist],
  wishlist => wishlist.wishlistItems
);

export const selectWishlistHidden = createSelector(
  [selectWishlist],
  wishlist => wishlist.hidden
);

export const selectWishlistItemsCount = createSelector(
  [selectWishlistItems],
  wishlistItems => wishlistItems.length
);

export const selectIsItemInWishlist = itemId => createSelector(
  [selectWishlistItems],
  wishlistItems => wishlistItems.some(item => item.id === itemId)
);
