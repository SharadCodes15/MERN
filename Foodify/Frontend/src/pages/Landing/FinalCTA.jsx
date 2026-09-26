const FinalCTA = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f3eee8]">

      {/* Background text */}
      <h2
        className=" bg-[url('/Images/TraditionalTable.jpg')] bg-clip-text text-8xl text-transparent
          absolute
          text-center
          text-[15vw]
          font-black
          uppercase
          leading-[0.8]
          tracking-[-0.06em]
        "
      >
        GOOD
        <br />
        FOOD
      </h2>

      {/* Food image */}
      {/* <img
        src="/Images/TraditionalTable.jpg"
        alt="Burger"
        className="
          relative
          z-10
          w-[420px]
          max-w-[70vw]
          object-contain
          drop-shadow-2xl
        "
      /> */}

      {/* CTA */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex flex-col items-center gap-5">

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-black/50">
          Fresh ingredients • Bold flavors • Made daily
        </p>

        <button
          className="
            rounded-full
            bg-black
            px-10
            py-5
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#c9865e]
          "
        >
          Explore Menu →
        </button>

      </div>
    </section>
  );
};

export default FinalCTA;