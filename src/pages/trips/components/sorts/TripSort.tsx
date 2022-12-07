import './TripSort.scss'

const TripSort = () => {
  return (
    <div className="trips-sorting">
      <ul className="sort-content">
        <li className="trips-sort">Sort by</li>
        <li className="trip-sort">
          <button>Booking date</button>
        </li>
        <li className="active-trip-sort">
          <button>Check-in date</button>
        </li>
      </ul>
    </div>
  )
}

export default TripSort
