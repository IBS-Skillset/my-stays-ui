import React from 'react'
import './Home.scss'

function Home() {
  return (
    <>
      <div className="main-panel">
        <div className="front-header">
          <div className="box-container text-container h-full">
            <div className="main-text">Find your next stay</div>
            <div className="text-2xl font-light text-white">
              Search low prices on hotels, homes and much more...
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="box-container search-panel">
          <span>
            <input
              className="w-full outline outline-amber-500 h-8 px-2 font-semibold" placeholder='search'
              type="text"
            />
          </span>
        </div>
        {/* content here */}
      </div>
    </>
  )
}

export default Home
