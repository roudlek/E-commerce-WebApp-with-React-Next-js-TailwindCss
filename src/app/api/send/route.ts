// import { EmailReceiptTemplate } from "@/components/email-template";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  //   if (req.method === "POST") {
  const { name, numberPhone, address, productsInCart} = await request.json();

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["elidrissiabdalaziz@gmail.com"],
      subject: "New order from your ecommerce app.",
      react: EmailTemplate({
        name: name,
        numberPhone: numberPhone,
        address: address,
        productsInCart: productsInCart
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
  //   }
}
