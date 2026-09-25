import React from 'react'
import LandingNavbar from './LandingNavbar';

const Landingpage = () => {
  return (
    <div>
      <main>
        <section className="bg-white">
            <LandingNavbar/>
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                Welcome to the Neighborhood Culinary Network
              </h1>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Landingpage