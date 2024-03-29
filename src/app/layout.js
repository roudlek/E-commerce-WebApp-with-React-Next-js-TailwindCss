import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import DeliveryFullBaner from "./_components/DelivryFullBanner";
import { CartProvider } from "./_contexts/ProductCartContext";
// import ThemeButton from "./_components/XstateThemeButton";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "The home page",
};
// Only the root layout can contain <html> and <body> tags.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <DeliveryFullBaner />
          <div className="pt-[40px]" />

          <Navbar />

          {/* this div create space between the fixed navbar and the content. so it doesnt cut like title for ex... */}
          <div className="pt-[65px]" />
          {/* <ThemeButton/> */}
          <div className="min-h-screen">
          {children}
          </div>
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
