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

// Create a mock dispatch function
const mockDispatch = jest.fn();

// Mock the entire hooks module
// jest.mock("@/lib/hooks", () => ({
//   useAppDispatch: () => mockDispatch,
// }));

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
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders cart item correctly", () => {
    render(
      <Provider
        store={createMockStore({
          items: [mockProduct],
          total: 39.98,
          itemCount: 2,
          isLoading: false,
        })}
      >
        <CartItem item={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$39.98")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("handles quantity increase", () => {
    render(
      <Provider
        store={createMockStore({
          items: [mockProduct],
          total: 39.98,
          itemCount: 2,
          isLoading: false,
        })}
      >
        <CartItem item={mockProduct} />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    const plusButton = buttons[1]; // Second button is typically the plus button

    fireEvent.click(plusButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuantity({ id: 1, quantity: 3 })
    );
  });

  it("handles quantity decrease", () => {
    render(
      <Provider
        store={createMockStore({
          items: [mockProduct],
          total: 39.98,
          itemCount: 2,
          isLoading: false,
        })}
      >
        <CartItem item={mockProduct} />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    const minusButton = buttons[0]; // First button is typically the minus button

    fireEvent.click(minusButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuantity({ id: 1, quantity: 1 })
    );
  });

  it("prevents quantity decrease below 1", () => {
    const singleItem: CartItemType = { ...mockProduct, quantity: 1 };
    render(
      <Provider
        store={createMockStore({
          items: [singleItem],
          total: 19.99,
          itemCount: 1,
          isLoading: false,
        })}
      >
        <CartItem item={singleItem} />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    const minusButton = buttons[0];

    expect(minusButton).toBeDisabled();
  });

  it("handles quantity input change", () => {
    render(
      <Provider
        store={createMockStore({
          items: [mockProduct],
          total: 39.98,
          itemCount: 2,
          isLoading: false,
        })}
      >
        <CartItem item={mockProduct} />
      </Provider>
    );

    const input = screen.getByDisplayValue("2");
    fireEvent.change(input, { target: { value: "5" } });

    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuantity({ id: 1, quantity: 5 })
    );
  });

  it("handles remove item", () => {
    render(
      <Provider
        store={createMockStore({
          items: [mockProduct],
          total: 39.98,
          itemCount: 2,
          isLoading: false,
        })}
      >
        <CartItem item={mockProduct} />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    const removeButton = buttons[buttons.length - 1]; // Last button is typically the remove button

    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(1));
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
    expect(newState.total).toBe(39.98);
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
    expect(newState.total).toBe(59.97);
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
    expect(newState.total).toBe(39.98);
    expect(newState.itemCount).toBe(2);
    expect(newState.isLoading).toBe(false);
  });
});
