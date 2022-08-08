import { Location as LocationSVG } from '../../../../assets/svg/location'
import { Calendar as CalendarSVG } from '../../../../assets/svg/calendar'
import DateRangePicker from '../../../../common/datePicker/DateRangePicker'
import './hotelSearch.scss'

function hotelSearch() {
  return (
    <>
      <div className="main-panel">
        <div className="front-header">
          <div className="box-container text-container h-full">
            {/* <div className="main-text">Find your next stay</div>
            <div className="text-2xl font-light text-white">
              Search low prices on hotels, homes and much more...
            </div> */}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="box-container search-panel">
          <div className="search-container w-full">
            <div className="col-span-2 outline outline-none h-full">
              <div className="flex justify-around h-full">
                <div className="h-full">
                  <LocationSVG />
                </div>
                <input
                  className="h-full w-full outline-none pl-3"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>
            <div className="h-full flex flex-row">
              <DateRangePicker></DateRangePicker>
              <div>
                <CalendarSVG />
              </div>
            </div>
            <div className="h-full">
              <select
                className="w-full h-full border-l-amber-500 border-l outline-none"
                name="categories"
                id="categories"
              >
                <option value="">Adults</option>
                <option value="">Children</option>
                <option value="">Room</option>
              </select>
            </div>
            <div className="h-full search-action">
              <button className="search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default hotelSearch
