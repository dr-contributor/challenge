"use client"

import { EditPaymentDetails } from "@/app/components/payment-details/EditPaymentDetails"
import { Loading } from "@/app/components/Loading"
import { useEffect, useState } from "react"
import { PaymentDetail, getPaymentDetail } from "@/app/api/payment-details-api"

export default function page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false)
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail>()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result: PaymentDetail = await getPaymentDetail(params.id)

      setPaymentDetail(result)
      setLoading(false)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <>
      {
        loading ? <Loading loading={loading} /> : 
          <>
            <h1>Edit Investment</h1>
            {paymentDetail ? <EditPaymentDetails paymentDetail={paymentDetail}/> : <p>No Payment Detail with id {params.id} fround</p>}
          </>
      }
    </>
  )
}
