"use client";
import { useCart } from "@/app/_contexts/ProductCartContext";
// import html2canvas from "html2canvas";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaWhatsapp, FaStripe, FaPaypal, FaApple } from "react-icons/fa";

export default function Checkout() {
  const { productsInCart, updateProductInCart, removeProductFromCart } =
    useCart();
  const [formData, setFormData] = useState({
    name: "",
    numberPhone: "",
    address: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter();

  async function sendDataViaWhatsApp() {
    const myPhonenumber = "+212647745783";

    // Format product details for each item in the cart
    const productsInCartMessage = productsInCart
      .map((product) => {
        return (
          `*Product ID:* ${product.id}%0a` +
          `*Product Name:* ${product.title}%0a` +
          `*Quantity:* ${product.quantity}%0a`
        );
      })
      .join("%0a");

    const message =
      `*Name :* ${formData.name}%0a` +
      `*NumberPhone :* ${formData.numberPhone}%0a` +
      `*Adress:* ${formData.address}%0a` +
      `*Products in Cart:* %0a${productsInCartMessage}`;

    const url = `https://wa.me/${myPhonenumber}?text=${message}`;

    router.push(url);
  }

  const subTotal = productsInCart
    .reduce((accumilator, current) => {
      return accumilator + current.price * current.quantity;
    }, 0)
    .toFixed(2);

  const taxes = (
    productsInCart.reduce((accumilator, current) => {
      return accumilator + current.price * current.quantity;
    }, 0) * 0.05
  ).toFixed(2);

  function getShippingCost() {
    const shippingCost = productsInCart
      .reduce((accumilator, current) => {
        return accumilator + 10 * current.quantity;
      }, 0)
      .toFixed(2);
    return subTotal > 200 ? 0 : shippingCost;
  }
  const total = (
    parseFloat(subTotal) +
    parseFloat(taxes) +
    parseFloat(getShippingCost())
  ).toFixed(2);

  return (
    <div className="container mx-auto mb-4">
      {/* <h1 className="text-2xl font-bold mb-8 ml-5">Checkout Page</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Cart Section */}
        <div id="cart" className="flex h-full flex-col bg-zinc-100 ">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="text-lg font-medium text-gray-900">
                Your Order
              </div>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {/* Map only non-repetitive items */}
                  {[
                    ...new Set(productsInCart.map((product) => product.id)),
                  ].map((productId) => {
                    const product = productsInCart.find(
                      (item) => item.id === productId
                    );
                    return (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-white border-gray-200">
                          <Image
                            src={product.image}
                            alt={product.description}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>
                                  {product.title
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                </a>
                              </h3>
                              <p className="ml-4">{product.price} DH</p>
                            </div>
                            <p className="mt-2 mb-3 text-sm text-gray-500">
                              Color
                              {/* {product.color} */}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <button
                              className="w-5 h-5 bg-gray-200 hover:bg-gray-300"
                              onClick={() =>
                                updateProductInCart(product.id, -1)
                              }
                            >
                              {" "}
                              -{" "}
                            </button>
                            <p className="text-gray-500">
                              Qty {product.quantity || 1}
                            </p>
                            <button
                              className="w-5 h-5 bg-gray-200 hover:bg-gray-300"
                              onClick={() => updateProductInCart(product.id, 1)}
                            >
                              {" "}
                              +{" "}
                            </button>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-customDarkBlue hover:text-customDarkViolet"
                                onClick={() =>
                                  removeProductFromCart(product.id)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>
                {getShippingCost() === 0
                  ? "Free Shipping applied"
                  : "Shipping (10 Dh per item)"}
              </p>
              <p>{getShippingCost()} DH</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>Taxes (5%)</p>
              <p>{taxes} DH</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>Subtotal</p>
              <p>{subTotal} DH</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 my-2">
              <p>Total</p>
              <p>{total} DH</p>
            </div>
            {/* <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p> */}
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link
                  href="/products"
                  className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={sendDataViaWhatsApp} className="space-y-4 mx-4">
            <h2 className="my-4 text-xl font-semibold text-gray-900">
              Shipping information
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
                // autoFocus
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please enter your name correctly")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                pattern="^[A-Za-z ]{3,20}$"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberPhone"
                className="block text-sm font-medium mb-1"
              >
                Number Phone:
              </label>
              <input
                type="text"
                id="numberPhone"
                name="numberPhone"
                value={formData.numberPhone}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please enter your phone number correctly"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                pattern="^(\+\d{1,14}|\d{10,15})$"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please enter your address correctly"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                pattern="^.{5,100}$"
              />
            </div>

            {/* Add more form fields as needed */}

            <button
              type="submit"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white w-full px-4 py-2 rounded-md"
            >
              <FaWhatsapp className="mr-2" />
              Place Order
            </button>
            <button
              disabled
              className="flex items-center justify-center bg-indigo-300 text-white w-full px-4 py-2 rounded-md"
            >
              <FaStripe className="mr-2" />
            </button>
            <button
              disabled
              className="flex items-center justify-center bg-blue-300 text-white w-full px-4 py-2 rounded-md"
            >
              <FaPaypal className="mr-2" />
            </button>
            <button
              disabled
              className="flex items-center justify-center bg-gray-400 text-white w-full px-4 py-2 rounded-md"
            >
              <FaApple className="mr-2 " />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
