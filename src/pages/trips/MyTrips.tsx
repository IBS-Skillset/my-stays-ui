import './MyTrips.scss'
import TabNavigation from './components/tabs/navigation/TabNavigation'
import TripSort from './components/sorts/TripSort'
import React, { useEffect, useState } from 'react'
import TabContent from './components/tabs/content/TabContent'
import { MyTripsResponse, Trip } from '../../models/trips/myTripsResponse'
import MyTripsService from '../../services/trips/MyTripsService'
import { useSelector } from 'react-redux'
import DispatchPkceData from '../../setup/oauth2/pkce/DispatchPkceData'
import AuthorizeUser from '../../setup/oauth2/components/authorize/AuthorizeUser'
import TripsContent from './components/trips-content/TripsContent'
import loader from '../../assets/images/loader.gif'
import {
  getAccessToken,
  getIsAuthorized,
} from '../../store/selectors/Selectors'

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([])
  const [completedTrips, setCompletedTrips] = useState<Trip[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    MyTripsService.getMyTrips()
      .then((response) => {
        updateTrips(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const accessToken: string = useSelector(getAccessToken)
  const isAuthorized: boolean = useSelector(getIsAuthorized)

  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

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
    setIsLoaded(true)
  }

  const getTrips = (trips: Trip[], isCompleted: boolean) => {
    return isLoaded ? (
      trips.length > 0 ? (
        <TripsContent trips={trips} isCompleted={isCompleted} />
      ) : (
        <p>
          You have currently no
          {isCompleted ? ' completed ' : ' upcoming '}trips!
        </p>
      )
    ) : (
      <img src={loader} alt="loading..." />
    )
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
              {getTrips(upcomingTrips, false)}
            </TabContent>
            <TabContent id="completed" activeTab={activeTab}>
              {getTrips(completedTrips, true)}
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
