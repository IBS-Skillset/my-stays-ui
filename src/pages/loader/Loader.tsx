import './Loader.scss'

function Loader() {
  return (
    <div className="loader-container z-50">
      <div className="spinner loading">
        <div className="loading-text text-xl text-white">Loading</div>
      </div>
    </div>
  )
}

export default Loader
