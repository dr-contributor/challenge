'use client'

import { paymentDetails, PaymentDetail } from "../api/payment-details-api"
import { InvestmentList } from "../components/investments/InvestmentList"
import { useEffect, useState } from "react"
import { PaymentDetailList } from "../components/payment-details/PaymentDetailList"

export default function page() {
  const [paymentDetailList, setPaymentDetailList] = useState<PaymentDetail[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result: PaymentDetail[] = await paymentDetails()

      setPaymentDetailList(result)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Payment Details</h1>
      <PaymentDetailList list={paymentDetailList} />
    </>
  )
}
