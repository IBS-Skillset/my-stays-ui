import React from 'react'
import './PaymentDetails.css'
import cardNumber from '../../../../../assets/images/cardNumber.png'
import cvv from '../../../../../assets/images/cvv.png'
import debitCard from '../../../../../assets/images/debitCard.png'
import payPal from '../../../../../assets/images/payPal.png'
import googlePay from '../../../../../assets/images/googlePay.png'
import visa from '../../../../../assets/images/visa.png'
import masterCard from '../../../../../assets/images/masterCard.png'
import jcb from '../../../../../assets/images/jcb.png'
import dinnersClub from '../../../../../assets/images/dinnersClub.png'
import discover from '../../../../../assets/images/discover.png'
import amex from '../../../../../assets/images/americanExpress.png'

type Props = {
  register: any
  errors: any
}
const PaymentDetails = ({ register, errors }: Props) => {
  return (
    <div className="payment-details border-color">
      <h2 className="text-lg mt-1 ml-2 font-weight">
        How would you like to pay?
      </h2>
      <div className="payment-types details">
        <div>
          <img src={debitCard} className="debit-card-image" alt="" />
          <h1 className="debit-card">Debit/Credit card</h1>
        </div>
        <div>
          <img src={payPal} className="disabled-payment-type" alt="" />
          <h1 className="other-payment-type">Paypal</h1>
        </div>
        <div>
          <img src={googlePay} className="disabled-payment-type" alt="" />
          <h1 className="other-payment-type">GooglePay</h1>
        </div>
      </div>
      <h1 className="cards font-weight">New card</h1>
      <div className="cards-block details">
        <img src={visa} className="cards-image" alt="" />
        <img src={masterCard} className="cards-image" alt="" />
        <img src={amex} className="cards-image" alt="" />
        <img src={dinnersClub} className="cards-image" alt="" />
        <img src={jcb} className="cards-image" alt="" />
        <img src={discover} className="cards-image" alt="" />
      </div>
      <div className="payment">
        <h1 className="headings mt-4 font-weight">
          Cardholder name <span className="mandatory">*</span>
        </h1>
        <input
          className="rounded-sm bg-white card-details details border-color"
          type="text"
          id="cardHolderName"
          {...register('cardHolderName')}
        />
        {errors.cardHolderName && errors.cardHolderName?.message && (
          <h1 className="error-message">{errors.cardHolderName.message}</h1>
        )}
      </div>
      <div className="payment">
        <h2 className="headings mt-4 font-weight">
          Card number <span className="mandatory">*</span>
        </h2>
        <div className="rounded-sm bg-white card-details details border-color">
          <img src={cardNumber} className="card-number-image" alt="" />
          <input
            className="card-number"
            type="text"
            id="cardNumber"
            {...register('cardNumber')}
          />
        </div>
        {errors.cardNumber && errors.cardNumber?.message && (
          <h1 className="error-message">{errors.cardNumber.message}</h1>
        )}
      </div>
      <div className="other-card-details">
        <div>
          <h2 className="headings mt-4 font-weight">
            Expiry date <span className="mandatory">*</span>
          </h2>
          <input
            className="expiry border-color bg-white"
            placeholder="MM/YY"
            type="text"
            id="expiryDate"
            {...register('expiryDate')}
          />
          {errors.expiryDate && errors.expiryDate?.message && (
            <h1 className="error-message">{errors.expiryDate.message}</h1>
          )}
        </div>
        <div>
          <h2 className="headings mt-4 font-weight">
            CVC <span className="mandatory">*</span>
          </h2>
          <div className="cvc-details details border-color bg-white rounded-sm">
            <img src={cvv} className="card-number-image" alt="" />
            <input
              className="cvv-input"
              type="text"
              id="cvv"
              {...register('cvv')}
            />
          </div>
          {errors.cvv && errors.cvv?.message && (
            <h1 className="error-message">{errors.cvv.message}</h1>
          )}
        </div>
      </div>
    </div>
  )
}
export default PaymentDetails
