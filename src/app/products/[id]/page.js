import SingleProductPage from "./_components/SingleProductPage";

export async function generateStaticParams() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return products.map((product) => ({
      id: `${product.id}`,
  }));
}

export default function Page({ params }) {


  return (
    <div key={params.id} className="mx-auto w-fit ">
      <SingleProductPage id={params.id}  />
    </div>
  );
}
