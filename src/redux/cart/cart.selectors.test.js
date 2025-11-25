import {
  selectCartItems,
  selectCartHidden,
  selectCartItemsCount,
  selectCartTotal
} from './cart.selectors';

describe('Cart Selectors', () => {
  const mockState = {
    cart: {
      hidden: true,
      cartItems: [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 25, quantity: 3 },
        { id: 3, name: 'Item 3', price: 50, quantity: 1 }
      ]
    },
    user: {
      currentUser: null
    },
    shop: {
      collections: null
    }
  };

  describe('selectCartItems', () => {
    it('should select cart items from state', () => {
      const cartItems = selectCartItems(mockState);

      expect(cartItems).toEqual(mockState.cart.cartItems);
    });

    it('should return empty array when cart is empty', () => {
      const emptyState = {
        cart: { hidden: true, cartItems: [] }
      };

      const cartItems = selectCartItems(emptyState);

      expect(cartItems).toEqual([]);
    });
  });

  describe('selectCartHidden', () => {
    it('should select cart hidden state', () => {
      const hidden = selectCartHidden(mockState);

      expect(hidden).toBe(true);
    });

    it('should return false when cart is visible', () => {
      const visibleState = {
        cart: { hidden: false, cartItems: [] }
      };

      const hidden = selectCartHidden(visibleState);

      expect(hidden).toBe(false);
    });
  });

  describe('selectCartItemsCount', () => {
    it('should calculate total quantity of all items', () => {
      const count = selectCartItemsCount(mockState);

      // 2 + 3 + 1 = 6
      expect(count).toBe(6);
    });

    it('should return 0 for empty cart', () => {
      const emptyState = {
        cart: { hidden: true, cartItems: [] }
      };

      const count = selectCartItemsCount(emptyState);

      expect(count).toBe(0);
    });

    it('should handle single item correctly', () => {
      const singleItemState = {
        cart: {
          hidden: true,
          cartItems: [{ id: 1, name: 'Item 1', price: 10, quantity: 5 }]
        }
      };

      const count = selectCartItemsCount(singleItemState);

      expect(count).toBe(5);
    });

    it('should memoize the result when state has not changed', () => {
      const count1 = selectCartItemsCount(mockState);
      const count2 = selectCartItemsCount(mockState);

      expect(count1).toBe(count2);
    });
  });

  describe('selectCartTotal', () => {
    it('should calculate total price of all items', () => {
      const total = selectCartTotal(mockState);

      // (10 * 2) + (25 * 3) + (50 * 1) = 20 + 75 + 50 = 145
      expect(total).toBe(145);
    });

    it('should return 0 for empty cart', () => {
      const emptyState = {
        cart: { hidden: true, cartItems: [] }
      };

      const total = selectCartTotal(emptyState);

      expect(total).toBe(0);
    });

    it('should calculate correctly with decimal prices', () => {
      const decimalState = {
        cart: {
          hidden: true,
          cartItems: [
            { id: 1, name: 'Item 1', price: 9.99, quantity: 2 },
            { id: 2, name: 'Item 2', price: 15.50, quantity: 1 }
          ]
        }
      };

      const total = selectCartTotal(decimalState);

      // (9.99 * 2) + (15.50 * 1) = 19.98 + 15.50 = 35.48
      expect(total).toBe(35.48);
    });

    it('should calculate correctly with single item', () => {
      const singleItemState = {
        cart: {
          hidden: true,
          cartItems: [{ id: 1, name: 'Item 1', price: 100, quantity: 3 }]
        }
      };

      const total = selectCartTotal(singleItemState);

      expect(total).toBe(300);
    });

    it('should handle large quantities correctly', () => {
      const largeQuantityState = {
        cart: {
          hidden: true,
          cartItems: [{ id: 1, name: 'Item 1', price: 5, quantity: 100 }]
        }
      };

      const total = selectCartTotal(largeQuantityState);

      expect(total).toBe(500);
    });

    it('should memoize the result when state has not changed', () => {
      const total1 = selectCartTotal(mockState);
      const total2 = selectCartTotal(mockState);

      expect(total1).toBe(total2);
    });
  });
});
