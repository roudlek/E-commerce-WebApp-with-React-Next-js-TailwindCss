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
              {price} DH
            </p>
            <div>
              <p className="text-sm text-gray-600 line-through cursor-auto ml-2">
                {price * 2} DH
              </p>
            </div>
            <div className="ml-auto mr-4 ">
              <button
                className=" border-black border w-auto px-4 py-[2px] hover:px-5 hover:py-1 bg-white rounded-full transition duration-0 hover:duration-300 ease-in-out "
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
                <Image
                  className="m-auto"
                  width={20}
                  height={20}
                  alt="add to cart svg"
                  src="/addtocart.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
