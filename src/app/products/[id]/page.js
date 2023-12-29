"use client";
import SingleProductPage from "@/components/SingleProductPage";
import { useEffect, useState } from "react";




// try use this ::
// export async function generateStaticParams() {
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json()
//   );

//   return products.map((product) => ({
//     params: {
//       id: product.id.toString(),
//     },
//   }));
// }

export default function Page({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // const {
  //   title,
  //   price,
  //   description,
  //   category,
  //   image,
  //   rating 
  // } = product;

  return (
    <div key={params.id} className="mx-auto w-fit ">
      <SingleProductPage product={product} id={params.id}  />
    </div>
  );
}
