
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  numberPhone: string;
  address: string;
  productsInCart: Product[];
}

interface Product {
  title: string;
  image: string;
  quantity: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  numberPhone,
  address,
  productsInCart,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>Phone Number: {numberPhone}</p>
    <p>Address: {address}</p>
    <h2>Summary:</h2>

    {productsInCart.map((product, index) => (
      <div key={index} style={{ clear: "both", marginBottom: "10px" }}>
        <h3>
          {product.title} * {product.quantity}
        </h3>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "250px", display: "block" }}
        />
      </div>
    ))}
  </div>
);