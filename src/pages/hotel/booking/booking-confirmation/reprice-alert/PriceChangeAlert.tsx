import infoSVG from '../../../../../assets/svg/info.svg'
import './PriceChangeAlert.scss'

const PriceChangeAlert = () => {
  return (
    <div className="price-change-alert-outline">
      <div className="price-change-alert-image-container">
        <img src={infoSVG} alt="" className="info-image" />
      </div>
      <h1 className="price-change-alert">
        A price change is noticed from the selected price. Please confirm to
        book using the new price.
      </h1>
    </div>
  )
}

export default PriceChangeAlert
