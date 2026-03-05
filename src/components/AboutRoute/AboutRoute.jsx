import React from 'react'

export default function AboutRoute() {
  return (
      <section className={`relative order-2 mt-20 sm:max-w-8/10 mx-auto w-full px-10 z-50`}>
        <h1 className="text-blue-900 font-black  hidden lg:block ">Route Posts</h1>
        <p className="text-xl text-gray-800 my-3  hidden lg:block">
          Connect with friends and the world around you on Route Posts.
        </p>
        <div className="p-5 bg-white rounded-lg shadow shadow-sm shadow-gray-400 my-5">
          <h6 className="text-sm text-blue-900 uppercase">
            About Route Academy
          </h6>
          <p className="mt-1 text-stale-900 text-lg font-bold">
            Egypt's Leading IT Training Center Since 2012
          </p>
          <p className="leading-realxes mt-1 text-sm text-gray-600">
            Route Academy is the premier IT training center in Egypt,
            established in 2012. We specialize in delivering high-quality
            training courses in programming, web development, and application
            development. We've identified the unique challenges people may face
            when learning new technology and made efforts to provide strategies
            to overcome them.
          </p>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 *:bg-blue-100 *:rounded-xl *:border-1 *:border-blue-200 *:py-2 *:px-3">
            <div className="text-center md:text-left">
              <span className="text-blue-900 font-extrabold">2012</span>
              <p className="font-bold text-gray-700 uppercase text-[11px]">Founded</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-blue-900 font-extrabold">40K+</span>
              <p className="font-bold text-gray-700 uppercase text-[11px]">Graduates</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-blue-900 font-extrabold">50+</span>
              <p className="font-bold text-gray-700 uppercase text-[11px]">Partner Companies</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-blue-900 font-extrabold">5</span>
              <p className="font-bold text-gray-700 uppercase text-[11px]">Branches</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-blue-900 font-extrabold">20</span>
              <p className="font-bold text-gray-700 uppercase text-[11px]">Diplomas Available</p>
            </div>
          </div>
        </div>
      </section>
  )
}
