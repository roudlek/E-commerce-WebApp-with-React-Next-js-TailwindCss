import Image from "next/image";
import Link from "next/link";

export default function ProductItem({
  id,
  category,
  title,
  price,
  description,
  image,
  rating,
  quantity,
  addProductToCart,
}) {
  // title was loong so lets split it to three words
  const shortenedTitle = title.split(" ").slice(0, 3).join(" ");
  return (
    <>
      <div className="w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl">
        <Link href={`/products/${id}`}>
          <Image
            className="h-80 w-72 object-contain rounded-t-xl"
            src={image}
            alt={description}
            width={288}
            height={320}
          />
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {category}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {shortenedTitle}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${price}
            </p>
            <div>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ${price * 2}
              </p>
            </div>
            <div className="ml-auto mr-4 hover:bg-blue-500 rounded-full transition delay-150 duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 cursor-pointer"
                onClick={() =>
                  addProductToCart({
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rating,
                    quantity,
                  })
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
