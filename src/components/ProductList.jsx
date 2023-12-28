/* eslint-disable @next/next/no-img-element */
import ProductCart from "./ProductCart";
import ProductItem from "./ProductItem";

export default function ProductList({
  products,
  addProductToCart,
  productsInCart,
  updateProductQuantity,
  removeProductFromCart
}) {
  return (
    <>
      <div class="text-center p-10">
        <h1 class="font-bold text-4xl mb-4">Responsive Product card grid</h1>
        <h1 class="text-3xl">Tailwind CSS</h1>
      </div>

      <section
        id="Projects"
        class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
          {products.map((product) => {
            return (
              <div key={product.id}>
                <ProductItem
                  addProductToCart={addProductToCart}


                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                  rate={product.rating.rate}
                  count={product.rating.count}
                  quantity={product.quantity}
                />
              </div>
            );
          })}


      </section>

      <div>
        <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1">

        </ul>
      </div>
    </>
  );
}
