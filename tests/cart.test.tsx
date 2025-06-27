// tests/cart.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CartItem } from "../components/cart/cart-item";
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
} from "@/lib/reducers/cart/cart";
import { CartState, Product } from "@/types";

interface CartItemType extends Product {
  quantity: number;
}

const mockProduct: CartItemType = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  category: "electronics",
  image: "/test.jpg",
  quantity: 2,
  description: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

const createMockStore = (initialState: CartState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: initialState,
    },
  });
};

describe("CartItem Component", () => {
  it("renders cart item correctly", () => {
    const store = createMockStore({
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$39.98")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-input")).toHaveValue(2);
  });

  it("handles quantity increase", () => {
    const store = createMockStore({
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={mockProduct} />
      </Provider>
    );

    const plusButton = screen.getByTestId("increase-quantity");
    fireEvent.click(plusButton);

    // Check that the store state has been updated
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(3);
    expect(state.cart.total).toBeCloseTo(59.97, 2);
    expect(state.cart.itemCount).toBe(3);
  });

  it("handles quantity decrease", () => {
    const store = createMockStore({
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={mockProduct} />
      </Provider>
    );

    const minusButton = screen.getByTestId("decrease-quantity");
    fireEvent.click(minusButton);

    // Check that the store state has been updated
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(1);
    expect(state.cart.total).toBeCloseTo(19.99, 2);
    expect(state.cart.itemCount).toBe(1);
  });

  it("prevents quantity decrease below 1", () => {
    const singleItem: CartItemType = { ...mockProduct, quantity: 1 };
    const store = createMockStore({
      items: [singleItem],
      total: 19.99,
      itemCount: 1,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={singleItem} />
      </Provider>
    );

    const minusButton = screen.getByTestId("decrease-quantity");
    expect(minusButton).toBeDisabled();
  });

  it("handles quantity input change", () => {
    const store = createMockStore({
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={mockProduct} />
      </Provider>
    );

    const input = screen.getByTestId("quantity-input");
    fireEvent.change(input, { target: { value: "5" } });

    // Check that the store state has been updated
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(5);
    expect(state.cart.total).toBeCloseTo(99.95, 2);
    expect(state.cart.itemCount).toBe(5);
  });

  it("handles remove item", () => {
    const store = createMockStore({
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <CartItem item={mockProduct} />
      </Provider>
    );

    const removeButton = screen.getByTestId("remove-item");
    fireEvent.click(removeButton);

    // Check that the item has been removed from store
    const state = store.getState();
    expect(state.cart.items).toHaveLength(0);
    expect(state.cart.total).toBe(0);
    expect(state.cart.itemCount).toBe(0);
  });
});

describe("cartSlice Reducer", () => {
  const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
  };

  it("should handle addToCart with new item", () => {
    const newState = cartReducer(initialState, addToCart(mockProduct));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(1);
    expect(newState.total).toBe(19.99);
    expect(newState.itemCount).toBe(1);
  });

  it("should handle addToCart with existing item", () => {
    const stateWithItem = {
      ...initialState,
      items: [{ ...mockProduct, quantity: 1 }],
      total: 19.99,
      itemCount: 1,
    };
    const newState = cartReducer(stateWithItem, addToCart(mockProduct));
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.total).toBeCloseTo(39.98, 2);
    expect(newState.itemCount).toBe(2);
  });

  it("should handle removeFromCart", () => {
    const stateWithItem = {
      ...initialState,
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
    };
    const newState = cartReducer(stateWithItem, removeFromCart(1));
    expect(newState.items).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.itemCount).toBe(0);
  });

  it("should handle updateQuantity", () => {
    const stateWithItem = {
      ...initialState,
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
    };
    const newState = cartReducer(
      stateWithItem,
      updateQuantity({ id: 1, quantity: 3 })
    );
    expect(newState.items[0].quantity).toBe(3);
    expect(newState.total).toBeCloseTo(59.97, 2);
    expect(newState.itemCount).toBe(3);
  });

  it("should remove item when quantity is set to 0", () => {
    const stateWithItem = {
      ...initialState,
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
    };
    const newState = cartReducer(
      stateWithItem,
      updateQuantity({ id: 1, quantity: 0 })
    );
    expect(newState.items).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.itemCount).toBe(0);
  });

  it("should handle clearCart", () => {
    const stateWithItem = {
      ...initialState,
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
    };
    const newState = cartReducer(stateWithItem, clearCart());
    expect(newState.items).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.itemCount).toBe(0);
  });

  it("should handle loadCartFromStorage", () => {
    const storedState: CartState = {
      items: [mockProduct],
      total: 39.98,
      itemCount: 2,
      isLoading: true,
    };
    const newState = cartReducer(
      initialState,
      loadCartFromStorage(storedState)
    );
    expect(newState.items).toEqual(storedState.items);
    expect(newState.total).toBeCloseTo(39.98, 2);
    expect(newState.itemCount).toBe(2);
    expect(newState.isLoading).toBe(false);
  });
});
