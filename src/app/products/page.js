"use client";

import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import ProductCart from "@/components/ProductCart";
import addProductToCartUsingLocalStorage, { getCart } from "./_utils/cart";

export default function Products() {
  
  const [productsInCart, setProductsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  async function fetchData() {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error: ${response.status}`);
        }
      })
      // the returned value of first then goes to second then as param, the returned value of second then goes to third as param and so on ...
      // this ensure that data is availlable when going to next then (step)
      .then((data) => {
        return setProducts(data);
      })
      .catch((error) => {
        console.log(`Could not get products, error: ${error}`);
      });
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  function handleAddToCart(newProduct) {
    // Call the function to update local storage and get the updated cart
    const updatedCart = addProductToCartUsingLocalStorage(newProduct);

    // Update the component state with the updated cart
    setProductsInCart(updatedCart);
  }

  function removeProductFromCart(productId) {
    // Filter out the item to be removed
    const updatedCart = productsInCart.filter((product) => {
      if (product.id !== productId) {
        return true; // Keep the product in the cart
      } else {
        return false; // Exclude the product with the specified ID
      }
    });

    setProductsInCart(updatedCart);
  }

  function updateProductQuantity(productId, newQuantity) {
    // Find the item to update
    const updatedCart = productsInCart.map((product) => {
      if (product.id === productId) {
        product.quantity++;
        return { ...product, quantity: newQuantity || 1 };
      } else {
        return product;
      }
    });

    setProductsInCart(updatedCart);
  }

  return (
    <>
      <ProductCart
        removeProductFromCart={removeProductFromCart}
        updateProductQuantity={updateProductQuantity}
      />

      <ProductList
        productsInCart={productsInCart}
        products={products}
        addProductToCart={handleAddToCart}
      />
    </>
  );
}
