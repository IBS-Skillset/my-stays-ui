import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loader from '../../assets/images/loader.gif'
import { MyTripsResponse, Trip } from '../../models/trips/myTripsResponse'
import MyTripsService from '../../services/trips/MyTripsService'
import AuthorizeUser from '../../setup/oauth2/components/authorize/AuthorizeUser'
import DispatchPkceData from '../../setup/oauth2/pkce/DispatchPkceData'
import {
  getAccessToken,
  getIsAuthorized,
} from '../../store/selectors/Selectors'
import TripSort from './components/sorts/TripSort'
import TabContent from './components/tabs/content/TabContent'
import TabNavigation from './components/tabs/navigation/TabNavigation'
import TripsContent from './components/trips-content/TripsContent'
import CommonConstants from '../../constants/CommonConstants'

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming')
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([])
  const [completedTrips, setCompletedTrips] = useState<Trip[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const accessToken: string = useSelector(getAccessToken)
  const isAuthorized: boolean = useSelector(getIsAuthorized)

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

  useEffect(() => {
    MyTripsService.getMyTrips()
      .then((response) => {
        updateTrips(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (accessToken == '') {
    if (!isAuthorized) {
      DispatchPkceData()
    }
    return <AuthorizeUser />
  }

  const getTrips = (trips: Trip[], isCompleted: boolean) => {
    return isLoaded ? (
      trips.length > 0 ? (
        <TripsContent trips={trips} isCompleted={isCompleted} />
      ) : (
        <p>
          {isCompleted ? CommonConstants.COMPLETED : CommonConstants.UPCOMING}
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
              data-testid="Upcoming"
              title="Upcoming"
              id="upcoming"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavigation
              data-testid="Completed"
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
