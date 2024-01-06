"use client";

import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import ProductCart from "@/components/ProductCart";
import {
  addProductToCartUsingLocalStorage,
  getCart,
  removeProductFromCart,
  updateProductQuantityInLocalStorage,
} from "./_utils/cart";

const initialCart = getCart();

export default function Products() {
  const [productsInCart, setProductsInCart] = useState(initialCart);
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

  useEffect(()=>{
    // edit here 
  })

  function handleAddToCart(newProduct) {
    // Call the function to update local storage and get the updated cart
    const updatedCart = addProductToCartUsingLocalStorage(newProduct);

    // Update the component state with the updated cart
    setProductsInCart(updatedCart);
  }

  function handleUpdateProductCart(productId, quantity) {
    const updateCart = updateProductQuantityInLocalStorage(productId, quantity);

    setProductsInCart(updateCart);
  }

  function handleRemoveProduct(productId) {
    const updateCart = removeProductFromCart(productId);

    setProductsInCart(updateCart);
  }

  return (
    <>
      <ProductCart
        removeProductFromCart={handleRemoveProduct}
        updateProductQuantity={handleUpdateProductCart}
        productsInCart={productsInCart}
      />

      <ProductList
        products={products}
        addProductToCart={handleAddToCart}
      />
    </>
  );
}
