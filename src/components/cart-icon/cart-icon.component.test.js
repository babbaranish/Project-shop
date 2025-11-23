import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CartIcon from './cart-icon.component';

const mockReducer = (state = {
  cart: {
    hidden: true,
    cartItems: []
  }
}, action) => {
  switch (action.type) {
    case 'TOGGLE_CART_HIDDEN':
      return {
        ...state,
        cart: {
          ...state.cart,
          hidden: !state.cart.hidden
        }
      };
    default:
      return state;
  }
};

const renderWithRedux = (
  component,
  {
    initialState = {
      cart: {
        hidden: true,
        cartItems: []
      }
    },
    store = createStore(mockReducer, initialState)
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe('CartIcon Component', () => {
  it('should render without crashing', () => {
    renderWithRedux(<CartIcon />);
  });

  it('should display item count of 0 when cart is empty', () => {
    renderWithRedux(<CartIcon />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display correct item count', () => {
    const stateWithItems = {
      cart: {
        hidden: true,
        cartItems: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 }
        ]
      }
    };
    renderWithRedux(<CartIcon />, { initialState: stateWithItems });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should dispatch toggle action when clicked', () => {
    const { store } = renderWithRedux(<CartIcon />);
    const cartIcon = screen.getByText('0').parentElement;

    const initialHiddenState = store.getState().cart.hidden;
    fireEvent.click(cartIcon);
    const newHiddenState = store.getState().cart.hidden;

    expect(newHiddenState).not.toBe(initialHiddenState);
  });

  it('should update count when new items are added', () => {
    const { rerender } = renderWithRedux(<CartIcon />);
    expect(screen.getByText('0')).toBeInTheDocument();

    const stateWithItems = {
      cart: {
        hidden: true,
        cartItems: [{ id: 1, quantity: 1 }]
      }
    };
    const newStore = createStore(mockReducer, stateWithItems);

    rerender(
      <Provider store={newStore}>
        <CartIcon />
      </Provider>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
