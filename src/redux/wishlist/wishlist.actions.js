import WishlistActionTypes from './wishlist.types';

export const addToWishlist = item => ({
  type: WishlistActionTypes.ADD_TO_WISHLIST,
  payload: item
});

export const removeFromWishlist = item => ({
  type: WishlistActionTypes.REMOVE_FROM_WISHLIST,
  payload: item
});

export const toggleWishlistHidden = () => ({
  type: WishlistActionTypes.TOGGLE_WISHLIST_HIDDEN
});
