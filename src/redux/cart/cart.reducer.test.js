import cartReducer from './cart.reducer';
import CartActionTypes from './cart.types';

describe('cartReducer', () => {
  const initialState = {
    hidden: true,
    cartItems: []
  };

  it('should return initial state when no action is provided', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('should toggle cart hidden state', () => {
    const action = { type: CartActionTypes.TOGGLE_CART_HIDDEN };

    const state1 = cartReducer(initialState, action);
    expect(state1.hidden).toBe(false);

    const state2 = cartReducer(state1, action);
    expect(state2.hidden).toBe(true);
  });

  it('should add item to cart', () => {
    const mockItem = { id: 1, name: 'Test Item', price: 10 };
    const action = {
      type: CartActionTypes.ADD_ITEM,
      payload: mockItem
    };

    const newState = cartReducer(initialState, action);

    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0]).toEqual({ ...mockItem, quantity: 1 });
  });

  it('should increment quantity when adding existing item', () => {
    const mockItem = { id: 1, name: 'Test Item', price: 10 };
    const currentState = {
      hidden: true,
      cartItems: [{ ...mockItem, quantity: 1 }]
    };
    const action = {
      type: CartActionTypes.ADD_ITEM,
      payload: mockItem
    };

    const newState = cartReducer(currentState, action);

    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0].quantity).toBe(2);
  });

  it('should remove item from cart by decrementing quantity', () => {
    const mockItem = { id: 1, name: 'Test Item', price: 10 };
    const currentState = {
      hidden: true,
      cartItems: [{ ...mockItem, quantity: 2 }]
    };
    const action = {
      type: CartActionTypes.REMOVE_ITEM,
      payload: mockItem
    };

    const newState = cartReducer(currentState, action);

    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0].quantity).toBe(1);
  });

  it('should remove item from cart when quantity is 1', () => {
    const mockItem = { id: 1, name: 'Test Item', price: 10 };
    const currentState = {
      hidden: true,
      cartItems: [{ ...mockItem, quantity: 1 }]
    };
    const action = {
      type: CartActionTypes.REMOVE_ITEM,
      payload: mockItem
    };

    const newState = cartReducer(currentState, action);

    expect(newState.cartItems).toHaveLength(0);
  });

  it('should clear item from cart completely', () => {
    const mockItem1 = { id: 1, name: 'Test Item 1', price: 10, quantity: 3 };
    const mockItem2 = { id: 2, name: 'Test Item 2', price: 20, quantity: 1 };
    const currentState = {
      hidden: true,
      cartItems: [mockItem1, mockItem2]
    };
    const action = {
      type: CartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: mockItem1
    };

    const newState = cartReducer(currentState, action);

    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0].id).toBe(2);
  });

  it('should clear all items after payment', () => {
    const currentState = {
      hidden: true,
      cartItems: [
        { id: 1, name: 'Test Item 1', price: 10, quantity: 3 },
        { id: 2, name: 'Test Item 2', price: 20, quantity: 1 }
      ]
    };
    const action = { type: CartActionTypes.CLEAR_AFTER_PAYMENT };

    const newState = cartReducer(currentState, action);

    expect(newState.cartItems).toEqual([]);
    expect(newState.hidden).toBe(true);
  });

  it('should not mutate state', () => {
    const currentState = {
      hidden: true,
      cartItems: [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }]
    };
    const action = { type: CartActionTypes.TOGGLE_CART_HIDDEN };

    const newState = cartReducer(currentState, action);

    expect(newState).not.toBe(currentState);
    expect(newState.cartItems).not.toBe(currentState.cartItems);
  });

  it('should handle unknown action types', () => {
    const currentState = {
      hidden: false,
      cartItems: [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }]
    };
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = cartReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
