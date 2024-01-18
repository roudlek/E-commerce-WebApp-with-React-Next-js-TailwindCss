// import { EmailReceiptTemplate } from "@/components/email-template";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

// const resend = new Resend("re_9YrRkJhi_D6Ppqk14cPkzqYgCNKHzvteZ");
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  //   if (req.method === "POST") {
  const { name, email, numberPhone, address, productsInCart} = await request.json();

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Your order is on its way",
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
