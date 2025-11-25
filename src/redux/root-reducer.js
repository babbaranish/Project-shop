import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import wishlistReducer from './wishlist/wishlist.reducer';
import reviewsReducer from './reviews/reviews.reducer';
import ordersReducer from './orders/orders.reducer';
import couponReducer from './coupon/coupon.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist', 'reviews', 'orders']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  wishlist: wishlistReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  coupon: couponReducer
});

export default persistReducer(persistConfig, rootReducer);
