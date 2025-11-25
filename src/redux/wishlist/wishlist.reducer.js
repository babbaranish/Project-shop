import WishlistActionTypes from './wishlist.types';

const INITIAL_STATE = {
  hidden: true,
  wishlistItems: []
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WishlistActionTypes.ADD_TO_WISHLIST:
      const existingItem = state.wishlistItems.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return state;
      }

      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload]
      };

    case WishlistActionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          item => item.id !== action.payload.id
        )
      };

    case WishlistActionTypes.TOGGLE_WISHLIST_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };

    default:
      return state;
  }
};

export default wishlistReducer;
