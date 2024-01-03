"use client";

import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import ProductCart from "@/components/ProductCart";

export default function Products() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [open, setOpen] = useState(false);
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

  // useEffect allows you to run code after component mount
  useEffect(() => {
    console.log(productsInCart);
    return () => {};
  });

  useEffect(() => {
    fetchData();
    return () => {};
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  // let products = [
  //   {
  //     id: 1,
  //     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     price: 109.95,
  //     description:
  //       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     category: "men's clothing",
  //     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     rating: {
  //       rate: 3.9,
  //       count: 120,
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: "Mens Casual Premium Slim Fit T-Shirts ",
  //     price: 22.3,
  //     description:
  //       "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //     category: "men's clothing",
  //     image:
  //       "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //     rating: {
  //       rate: 4.1,
  //       count: 259,
  //     },
  //   },
  //   {
  //     id: 3,
  //     title: "Mens Cotton Jacket",
  //     price: 55.99,
  //     description:
  //       "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  //     category: "men's clothing",
  //     image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  //     rating: {
  //       rate: 4.7,
  //       count: 500,
  //     },
  //   },
  //   {
  //     id: 4,
  //     title: "Mens Casual Slim Fit",
  //     price: 15.99,
  //     description:
  //       "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  //     category: "men's clothing",
  //     image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  //     rating: {
  //       rate: 2.1,
  //       count: 430,
  //     },
  //   },
  // ];

  function addProductToCart(newProduct) {
    // Check if the item already exists in the cart
    const existingProduct = productsInCart.find(
      (product) => product.id === newProduct.id
    );

    // If the item exists, update its quantity
    if (existingProduct) {
      updateProductQuantity(existingProduct.id, existingProduct.quantity + 1);
      console.log("Existing product quantity has been updated");
    } else {
      // If the item doesn't exist, add it to the cart
      setProductsInCart((prevProductsInCart) => [
        ...prevProductsInCart,
        {
          id: newProduct.id,
          title: newProduct.title,
          price: newProduct.price,
          description: newProduct.description,
          category: newProduct.category,
          image: newProduct.image,
          rating: {
            rate: newProduct.rating.rate,
            count: newProduct.rating.count,
          },
          quantity: 1, // Set the initial quantity to 1
        },
      ]);
      console.log("A new product has been added to the cart");
    }
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

  function calculateSum() {}

  // function minusOneQuantityOfSameProduct() {
  //   // using a minus sign in product cart
  // }
  // function addOneQuantityOfSameProduct() {
  //   // using a plus sign in product cart
  // }
  // function updateShoppingCartItemsNumberWhenClickingInAdd() {}

  return (
    <>
      <ProductCart
        productsInCart={productsInCart}
        open={open}
        setOpen={setOpen}
        removeProductFromCart={removeProductFromCart}
        updateProductQuantity={updateProductQuantity}
      />

      <ProductList
        addProductToCart={addProductToCart}
        removeProductFromCart={removeProductFromCart}
        updateProductQuantity={updateProductQuantity}
        products={products}
        productsInCart={productsInCart}
      />
    </>
  );
}
