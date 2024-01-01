// "use client";
// import { useEffect, useState } from "react";
import SingleProductPage from "@/app/products/[id]/components/SingleProductPage";

// try use this ::
export async function generateStaticParams() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return products.map((product) => ({
    params: {
      id: product.id,
    },
  }));
}

export default function Page({ params }) {


  // const {id, title, price, description, image} = params
  return (
    <div key={params.id} className="mx-auto w-fit ">
      <SingleProductPage id={params.id}  />
    </div>
  );
}
