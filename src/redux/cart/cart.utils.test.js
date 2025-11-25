import { addItemToCart, removeItemFromCart } from './cart.utils';

describe('addItemToCart', () => {
  it('should add a new item to an empty cart', () => {
    const cartItems = [];
    const itemToAdd = { id: 1, name: 'Item 1', price: 10 };

    const result = addItemToCart(cartItems, itemToAdd);

    expect(result).toEqual([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }]);
  });

  it('should add a new item to a cart with existing different items', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 2 }];
    const itemToAdd = { id: 2, name: 'Item 2', price: 20 };

    const result = addItemToCart(cartItems, itemToAdd);

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ id: 2, name: 'Item 2', price: 20, quantity: 1 });
  });

  it('should increment quantity when adding an existing item', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 2 }];
    const itemToAdd = { id: 1, name: 'Item 1', price: 10 };

    const result = addItemToCart(cartItems, itemToAdd);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
  });

  it('should not mutate the original cart items array', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 1 }];
    const originalCart = [...cartItems];
    const itemToAdd = { id: 2, name: 'Item 2', price: 20 };

    addItemToCart(cartItems, itemToAdd);

    expect(cartItems).toEqual(originalCart);
  });

  it('should preserve other item properties when incrementing quantity', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 1, imageUrl: 'test.jpg' }];
    const itemToAdd = { id: 1, name: 'Item 1', price: 10 };

    const result = addItemToCart(cartItems, itemToAdd);

    expect(result[0]).toMatchObject({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 2,
      imageUrl: 'test.jpg'
    });
  });
});

describe('removeItemFromCart', () => {
  it('should remove item from cart when quantity is 1', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 10, quantity: 1 },
      { id: 2, name: 'Item 2', price: 20, quantity: 2 }
    ];
    const itemToRemove = { id: 1 };

    const result = removeItemFromCart(cartItems, itemToRemove);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('should decrement quantity when quantity is greater than 1', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 3 }];
    const itemToRemove = { id: 1 };

    const result = removeItemFromCart(cartItems, itemToRemove);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it('should not mutate the original cart items array', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 2 }];
    const originalCart = [...cartItems];
    const itemToRemove = { id: 1 };

    removeItemFromCart(cartItems, itemToRemove);

    expect(cartItems).toEqual(originalCart);
  });

  it('should only affect the specified item when removing', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 10, quantity: 2 },
      { id: 2, name: 'Item 2', price: 20, quantity: 3 }
    ];
    const itemToRemove = { id: 1 };

    const result = removeItemFromCart(cartItems, itemToRemove);

    expect(result).toHaveLength(2);
    expect(result[0].quantity).toBe(1);
    expect(result[1].quantity).toBe(3);
  });

  it('should preserve other item properties when decrementing quantity', () => {
    const cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 2, imageUrl: 'test.jpg' }];
    const itemToRemove = { id: 1 };

    const result = removeItemFromCart(cartItems, itemToRemove);

    expect(result[0]).toMatchObject({
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 1,
      imageUrl: 'test.jpg'
    });
  });
});
