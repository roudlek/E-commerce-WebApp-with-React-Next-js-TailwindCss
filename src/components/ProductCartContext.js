"use client";
import {
  addProductToCartUsingLocalStorage,
  getCart,
  removeProductFromCartOfLocalStorage,
  updateProductQuantityInLocalStorage,
} from "@/app/products/_utils/cart";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  
  const [productsInCart, setProductsInCart] = useState([]);
  
  const loadProductsInCart = () => {
    const initialCart = getCart();
    setProductsInCart(initialCart);
  }

  const addToCart = (newProduct) => {
    const updatedCart = addProductToCartUsingLocalStorage(newProduct);

    setProductsInCart(updatedCart);
  };

  const updateProductInCart = (productId, quantity) => {
    const updateCart = updateProductQuantityInLocalStorage(productId, quantity);

    setProductsInCart(updateCart);
  };

  const removeProductFromCart = (productId) => {
    const updateCart = removeProductFromCartOfLocalStorage(productId);

    setProductsInCart(updateCart);
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        loadProductsInCart,
        addToCart,
        updateProductInCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
