import React, { useEffect, useState } from 'react'
import { Trip } from '../../../../models/trips/myTripsResponse'
import TripDetails from '../trip-details/TripDetails'

export type Props = {
  trips: Trip[]
  isCompleted: boolean
}

const TripsContent = ({ trips, isCompleted }: Props) => {
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips.slice(0, 10))

  useEffect(() => {
    const handleScrollEvent = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        trips.length > filteredTrips.length
      ) {
        const currentTripsSize = filteredTrips.length
        let updatedTrips
        if (trips.length - currentTripsSize > 10) {
          updatedTrips = filteredTrips.concat(
            trips.slice(currentTripsSize, currentTripsSize + 10),
          )
        } else {
          updatedTrips = filteredTrips.concat(trips.slice(currentTripsSize))
        }
        setFilteredTrips(updatedTrips)
      }
    }

    window.addEventListener('scroll', handleScrollEvent)

    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [filteredTrips.length])
  return (
    <>
      {filteredTrips.map((trip, i) => (
        <TripDetails trip={trip} isCompleted={isCompleted} key={i} />
      ))}
    </>
  )
}

export default TripsContent
