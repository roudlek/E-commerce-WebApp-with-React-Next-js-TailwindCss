import ProductItem from "./ProductItem";

export default function ProductList({
  products,
  addProductToCart
}) {
  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Responsive Product card grid</h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
      </div>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
          {products.map((product) => {
            return (
              <div key={product.id}>
                <ProductItem
                  addProductToCart={addProductToCart}
                  {...product}
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
