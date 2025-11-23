// Enhanced cart utilities with stock management

export const addItemToCartWithStock = (cartItems, cartItemToAdd, stockLimit = 10) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    // Check if adding one more would exceed stock
    if (existingCartItem.quantity >= stockLimit) {
      alert(`Sorry, only ${stockLimit} items available in stock`);
      return cartItems;
    }

    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1, stockLimit }];
};

export const checkStockAvailability = (item, requestedQuantity) => {
  const stock = item.stock || 10; // Default stock of 10 if not specified
  return requestedQuantity <= stock;
};

export const getItemsOutOfStock = (items) => {
  return items.filter(item => (item.stock || 10) === 0);
};

export const getItemsLowStock = (items, threshold = 3) => {
  return items.filter(item => {
    const stock = item.stock || 10;
    return stock > 0 && stock <= threshold;
  });
};
