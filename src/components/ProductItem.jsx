import Image from "next/image";

export default function ProductItem({
  id,
  title,
  price,
  description,
  category,
  image,
  rate,
  count,
  quantity,
  addProductToCart,
}) {
  return (
    <>
      <div className="w-72 bg-white shadow-md rounded-xl duration-300 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <Image
            className="h-80 w-72 object-cover rounded-t-xl"
            src={image}
            alt={description}
            width={288}
            height={320}
          />
        </a>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${price}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ${price * 2}
              </p>
            </del>
            <div className="ml-auto mr-4 hover:bg-gray-500 rounded-full transition delay-150 duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
                onClick={() =>
                  addProductToCart({

                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rate,
                    count,
                    quantity,
                  }
                  )
                }
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
