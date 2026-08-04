import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        dispatch({
          type: 'LOAD_CART',
          payload: JSON.parse(savedCart),
        });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity: parseInt(quantity) },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Calculate totals
  const cartTotal = state.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const cartItemsCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const value = {
    items: state.items,
    cartTotal: parseFloat(cartTotal.toFixed(2)),
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Cart Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
