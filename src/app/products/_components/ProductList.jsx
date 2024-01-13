"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../_contexts/ProductCartContext";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  function handleAddToCart(newProduct) {
    addToCart(newProduct);
  }
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

  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Our products</h1>
        {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
      </div>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductItem addProductToCart={handleAddToCart} {...product} />
            </div>
          );
        })}
      </section>
    </>
  );
}
