"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCart } from "../_contexts/ProductCartContext";
import Link from "next/link";

export default function ProductCart({}) {
  const [open, setOpen] = useState(false);
  const {
    productsInCart,
    loadProductsInCart,
    updateProductInCart,
    removeProductFromCart,
  } = useCart();

  useEffect(() => {
    loadProductsInCart();
  }, []);

  const productsQuantity = productsInCart.reduce((accumulator, current) => {
    return accumulator + parseInt(current.quantity, 10);
  }, 0);

  return (
    <div className="relative h-10 w-full z-50">
      <div className="ml-4 flow-root lg:ml-6 mt-4">
        <button
          onClick={() => setOpen(true)}
          className="group -m-2 flex items-center p-2"
        >
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          {/* shopping cart */}

          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {productsQuantity}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
      {/* <button
        type="button"
        className="h-10 px-2  hover:bg-gray-500  font-normal top-28 right-0  fixed"
      >
        Shopping Cart {productsQuantity}
      </button> */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {/* Map only non-repetitive items */}
                              {[
                                ...new Set(
                                  productsInCart.map((product) => product.id)
                                ),
                              ].map((productId) => {
                                const product = productsInCart.find(
                                  (item) => item.id === productId
                                );
                                return (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                          <p className="ml-4 ">
                                            {product.price} DH
                                          </p>
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
                                          onClick={() =>
                                            updateProductInCart(product.id, 1)
                                          }
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
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            {productsInCart
                              .reduce((accumilator, current) => {
                                return (
                                  accumilator + current.price * current.quantity
                                );
                              }, 0)
                              .toFixed(2)}
                             {" "}DH
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-customDarkBlue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-customDarkViolet"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or {" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
