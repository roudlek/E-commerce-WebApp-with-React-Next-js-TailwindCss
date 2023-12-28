import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* <!-- Logo or brand --> */}
        <a href="#" className="text-white text-lg font-bold">
          Your Brand
        </a>

        {/* <!-- Navigation links --> */}
        <div className="space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/dashboard" className="text-white">
            Dashboard
          </Link>
          <a href="#" className="text-white">
            About Us
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
