import userReducer from './user.reducer';
import { UserActionTypes } from './user.types';

describe('userReducer', () => {
  const initialState = {
    currentUser: null
  };

  it('should return initial state when no action is provided', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should set current user', () => {
    const mockUser = {
      id: '123',
      displayName: 'Test User',
      email: 'test@example.com'
    };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: mockUser
    };

    const newState = userReducer(initialState, action);

    expect(newState.currentUser).toEqual(mockUser);
  });

  it('should update current user', () => {
    const currentState = {
      currentUser: {
        id: '123',
        displayName: 'Old User',
        email: 'old@example.com'
      }
    };
    const newUser = {
      id: '456',
      displayName: 'New User',
      email: 'new@example.com'
    };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: newUser
    };

    const newState = userReducer(currentState, action);

    expect(newState.currentUser).toEqual(newUser);
  });

  it('should clear current user when payload is null', () => {
    const currentState = {
      currentUser: {
        id: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      }
    };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: null
    };

    const newState = userReducer(currentState, action);

    expect(newState.currentUser).toBeNull();
  });

  it('should not mutate state', () => {
    const currentState = {
      currentUser: {
        id: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      }
    };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: { id: '456', displayName: 'New User', email: 'new@example.com' }
    };

    const newState = userReducer(currentState, action);

    expect(newState).not.toBe(currentState);
  });

  it('should handle unknown action types', () => {
    const currentState = {
      currentUser: {
        id: '123',
        displayName: 'Test User',
        email: 'test@example.com'
      }
    };
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = userReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
