import shopReducer from './shop.reducer';
import ShopActionTypes from './shop.types';

describe('shopReducer', () => {
  const initialState = {
    collections: null
  };

  it('should return initial state when no action is provided', () => {
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });

  it('should update collections', () => {
    const mockCollections = {
      hats: {
        id: 1,
        title: 'Hats',
        routeName: 'hats',
        items: [
          { id: 1, name: 'Hat 1', price: 20 },
          { id: 2, name: 'Hat 2', price: 25 }
        ]
      },
      sneakers: {
        id: 2,
        title: 'Sneakers',
        routeName: 'sneakers',
        items: [
          { id: 3, name: 'Sneaker 1', price: 100 },
          { id: 4, name: 'Sneaker 2', price: 120 }
        ]
      }
    };
    const action = {
      type: ShopActionTypes.UPDATE_COLLECTIONS,
      payload: mockCollections
    };

    const newState = shopReducer(initialState, action);

    expect(newState.collections).toEqual(mockCollections);
  });

  it('should replace existing collections with new ones', () => {
    const oldCollections = {
      hats: { id: 1, title: 'Hats', items: [] }
    };
    const currentState = {
      collections: oldCollections
    };
    const newCollections = {
      sneakers: { id: 2, title: 'Sneakers', items: [] }
    };
    const action = {
      type: ShopActionTypes.UPDATE_COLLECTIONS,
      payload: newCollections
    };

    const newState = shopReducer(currentState, action);

    expect(newState.collections).toEqual(newCollections);
    expect(newState.collections).not.toEqual(oldCollections);
  });

  it('should set collections to null when payload is null', () => {
    const currentState = {
      collections: {
        hats: { id: 1, title: 'Hats', items: [] }
      }
    };
    const action = {
      type: ShopActionTypes.UPDATE_COLLECTIONS,
      payload: null
    };

    const newState = shopReducer(currentState, action);

    expect(newState.collections).toBeNull();
  });

  it('should not mutate state', () => {
    const currentState = {
      collections: {
        hats: { id: 1, title: 'Hats', items: [] }
      }
    };
    const action = {
      type: ShopActionTypes.UPDATE_COLLECTIONS,
      payload: { sneakers: { id: 2, title: 'Sneakers', items: [] } }
    };

    const newState = shopReducer(currentState, action);

    expect(newState).not.toBe(currentState);
  });

  it('should handle unknown action types', () => {
    const currentState = {
      collections: {
        hats: { id: 1, title: 'Hats', items: [] }
      }
    };
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = shopReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
