// components/HeroSection.js
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-10 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-lg mb-6">
              High-quality items at your fingertips.
            </p>
            <Link href="/products"
className="bg-white text-gray-900 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300">
                Shop Now

            </Link>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority={true}
          />
        </section>
      );
};

export default HeroSection;
