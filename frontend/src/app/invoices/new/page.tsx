"use client"

import { useEffect, useState } from "react"
import { Investor, investors } from "@/app/api/investor-api"
import { Loading } from "@/app/components/Loading"
import { CreateInvoice } from "@/app/components/invoices/CreateInvoice"
import { PaymentDetail, paymentDetails } from "@/app/api/payment-details-api"

export default function page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false)
  const [investorList, setInvestorList] = useState<Investor[]>([])
  const [paymentDetailsList, setPaymentDetailsList] = useState<PaymentDetail[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchInvestors = async () => {
      const result: Investor[] = await investors()

      setInvestorList(result)
      setLoading(false)
    }

    const fetchPaymentDetailsList = async () => {
      const result: PaymentDetail[] = await paymentDetails()

      setPaymentDetailsList(result)
      setLoading(false)
    }

    fetchInvestors().catch(err => console.log(err))
    fetchPaymentDetailsList().catch(err => console.log(err))
  }, [])

  return (
    <>
      {
        loading ? 
          <Loading loading={loading} /> :
          <>
            <h1>New Capital Call</h1>
            <CreateInvoice investors={investorList} paymentDetails={paymentDetailsList} />
          </>
      }
    </>
  )
}
