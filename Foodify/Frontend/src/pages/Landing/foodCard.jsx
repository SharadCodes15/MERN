import React from 'react'

const FoodCard = ({
  title,
  price,
  image,
  description,
  category = "Chef's Choice",
  rating = "4.8",
}) => {
  return (
    <article className="group flex h-[560px] w-[400px] shrink-0 flex-col rounded-[32px] bg-[#f4eee8] p-4 shadow-xl">

      {/* Image */}
      <div className="relative h-[310px] w-full overflow-hidden rounded-[24px] bg-[#e5ddd5]">
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold backdrop-blur text-black">
          {category}
        </span>

        {/* Rating */}
        <span className="absolute right-4 top-4 rounded-full bg-black px-3 py-2 text-xs font-semibold text-white">
          ★ {rating}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2 pt-5">

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight text-black">
            {title}
          </h2>

          <span className="rounded-full bg-[#c9865e] px-4 py-2 text-sm font-bold text-white">
            ${price}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 max-w-[340px] text-sm leading-5 text-gray-500">
          {description}
        </p>

        {/* Bottom */}
        <div className="mt-auto pt-5">
          <button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-black
              py-4
              text-base
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#c9865e]
              hover:scale-[1.02]
              active:scale-95
            "
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
              +
            </span>

            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;