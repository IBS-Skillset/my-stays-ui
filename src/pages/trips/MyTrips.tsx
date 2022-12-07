import './MyTrips.scss'
import TabNavigation from './components/tabs/navigation/TabNavigation'
import TripSort from './components/sorts/TripSort'
import { useEffect, useState } from 'react'
import TabContent from './components/tabs/content/TabContent'
import TripDetails from './components/trip-details/TripDetails'
import { MyTripsResponse, Trip } from '../../models/trips/myTripsResponse'
import MyTripsService from '../../services/trips/MyTripsService'

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([])
  const [completedTrips, setCompletedTrips] = useState<Trip[]>([])

  useEffect(() => {
    MyTripsService.getMyTrips()
      .then((response) => {
        updateTrips(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const updateTrips = (response: MyTripsResponse) => {
    const upcomingTrip: Trip[] = []
    const completedTrip: Trip[] = []
    response.myTrips.map((trip) => {
      if (new Date(trip.checkOutDate) < new Date()) {
        trip.freeCancellationUntil = null
        completedTrip.push(trip)
      } else {
        upcomingTrip.push(trip)
      }
    })
    setUpcomingTrips(upcomingTrip)
    setCompletedTrips(completedTrip)
  }

  return (
    <div className="main-content">
      <div className="trips-content">
        <div className="trips-tabs">
          <ul className="trips-navigation">
            <TabNavigation
              title="Upcoming"
              id="upcoming"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavigation
              title="Completed"
              id="completed"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {/* TODO: Needs update with TabNavigation after Cancelled trip implementation */}
            <li className="trips not-allowed-tab">
              <button className="not-allowed-tab">Cancelled</button>
            </li>
          </ul>
          <TripSort />
        </div>
        <div className="tab-contents">
          <div className="tab-content">
            <TabContent id="upcoming" activeTab={activeTab}>
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip, i) => (
                  <TripDetails trip={trip} isCompleted={false} key={i} />
                ))
              ) : (
                <p>You have currently No upcoming trips!</p>
              )}
            </TabContent>
            <TabContent id="completed" activeTab={activeTab}>
              {completedTrips.length > 0 ? (
                completedTrips.map((trip, i) => (
                  <TripDetails trip={trip} isCompleted={true} key={i} />
                ))
              ) : (
                <p>You have currently No completed trips!</p>
              )}
            </TabContent>
            <TabContent id="cancelled" activeTab={activeTab}>
              <p>Cancelled trips!</p>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTrips
