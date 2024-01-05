const CART_KEY = "shoppingCart";

export const getCart = () => {
  let cartData = localStorage.getItem(CART_KEY);

  // Check if cartData exists in localStorage
  if (!cartData) {
    // If it doesn't exist, set an empty array in localStorage
    localStorage.setItem(CART_KEY, JSON.stringify([{
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "quantity": 1,
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    }]));
    cartData = localStorage.getItem(CART_KEY);
  }

  return JSON.parse(cartData);
};

export const updateCart = (newCart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

// export const clearCart = () => {
//   localStorage.removeItem(CART_KEY);
// };

export const addProductToCartUsingLocalStorage = (newProduct) => {
  let prevProductsInCart = getCart();

  // Check if prevProductsInCart is an array
  if (!Array.isArray(prevProductsInCart)) {
    console.error("Invalid cart data found in local storage");
    return prevProductsInCart; // Return the invalid data or handle it as needed
  }

  // Check if the item already exists in the cart
  // .find returns that found object, otherwise undefined
  if (prevProductsInCart.length > 0) {
    const existingProduct = prevProductsInCart.find((product) => {
      return product.id === newProduct.id;
    });
    if (existingProduct === undefined) {
      // if product doesnt exist add that product
      // prevProductsInCart = [
      //   ...prevProductsInCart,
      //   {
      //     id: newProduct.id,
      //     title: newProduct.title,
      //     price: newProduct.price,
      //     description: newProduct.description,
      //     category: newProduct.category,
      //     image: newProduct.image,
      //     rating: {
      //       rate: newProduct.rating.rate,
      //       count: newProduct.rating.count,
      //     },
      //     quantity: 1, // Set the initial quantity to 1
      //   },
      // ];
      prevProductsInCart.push({
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
      });
      console.log(`product ${newProduct.title}has been added to the cart`);
    } else {
      // if exist update quantity of that specific product
      existingProduct.quantity += 1;
      console.log(`product ${existingProduct.title}quantity has been updated`);
    }
  }

  // Save the updated cart back to local storage
  updateCart(prevProductsInCart);

  return prevProductsInCart;
};

export const updateProductQuantityInLocalStorage = (productId, quantity) => {
  // Find the item to update
  let prevProductsInCart = getCart();

  prevProductsInCart.map((product) => {
    // if (product.quantity < 1) {
    //   product.quantity = 1;
    // }
    if (product.id === productId && quantity >= 1) {
      product.quantity += quantity;
    } else if (
      product.id === productId &&
      quantity < 0 &&
      product.quantity >= 2
    ) {
      product.quantity += quantity;
    }
  });
  updateCart(prevProductsInCart);
  return prevProductsInCart;
};

export const removeProductFromCart = (productId) => {
  let prevProductsInCart = getCart();

  prevProductsInCart = prevProductsInCart.filter((product) => {
    return product.id !== productId;
  });

  updateCart(prevProductsInCart);
  return prevProductsInCart;
};