const CART_KEY = "shoppingCart";

export const getCart = () => {
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : {};
};

export const updateCart = (newCart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
