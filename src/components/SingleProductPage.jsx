import ProductItem from "@/components/ProductItem";

export default function SingleProductPage({products, addProductToCart}) {
    return (
      <div key={params.id} className="m-auto">
        <ProductItem id={params.id} addProductToCart={addProductToCart}/>
      </div>
    )
}

// fix this
