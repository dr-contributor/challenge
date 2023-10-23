"use client"

import { Invoice, createInvoice } from "@/app/api/invoice-api"
import { Loading } from "@/app/components/Loading"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Investor } from "@/app/api/investor-api"
import { useRouter } from 'next/navigation';
import { Notification } from "../Notification"
import { PaymentDetail, paymentDetails } from "@/app/api/payment-details-api"
import { useSearchParams } from 'next/navigation'

export const CreateInvoice = ({ investors, paymentDetails }: { investors: Investor[], paymentDetails: PaymentDetail[] }) => {
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState("")
  const [issuedDate, setIssuedDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [paymentDetailsId, setPaymentDetailsId] = useState<string>(paymentDetails[0]?.id!)
  const [investorId, setInvestorId] = useState(1)
  const [bills, setBills] = useState<string[]>([])
  const router = useRouter();
  const [notification, setNotification] = useState("")
  const [notificationType, setNotificationType] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const billIds = searchParams.get('bills')?.split(",") || []
    const paramInvestorId = searchParams.get('investor') != null ? +searchParams.get('investor') : 1

    setBills(billIds)
    setInvestorId(paramInvestorId)
  }, [])

  const onNumberChange = (event: { target: { value: string } }) => {
    setNumber(event.target.value)
  }

  const onIssuedDateChange = (event: { target: { value: string } }) => {
    setIssuedDate(event.target.value)
  }

  const onDueDateChange = (event: { target: { value: string } }) => {
    setDueDate(event.target.value)
  }

  const onPaymentDetailsChange = (event: { target: { value: string } }) => {
    setPaymentDetailsId(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setLoading(true)
    event.preventDefault();

    console.log(bills)
    const newInvoice: Invoice = {
      number,
      issuedDate: new Date(issuedDate),
      dueDate: new Date(dueDate),
      investor: investorId,
      status: 'validated',
      paymentDetails: paymentDetailsId,
      bills
    }

    const performUpdate = async () => {
      return await createInvoice(newInvoice)
    }

    performUpdate()
    .then(result => router.push("/invoices"))
    .catch(err => {
      setNotification("Invoice could not be created")
      setNotificationType("danger")
      console.log(err)
    })

    setLoading(false)
  }

  return (
    <>
      <Notification message={notification} type={notificationType} />
      <Loading loading={loading} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input type="text" value={number} name="number" className="form-control" onChange={onNumberChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Issued Date</label>
          <input type="date" value={issuedDate} name="description" className="form-control" onChange={onIssuedDateChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input type="date" value={dueDate} name="description" className="form-control" onChange={onDueDateChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Investor</label>
          <select className="form-select" onChange={onPaymentDetailsChange} defaultValue={paymentDetailsId}>
            {
              paymentDetails?.map((pd, i) => {
                return <option key={i} value={pd.id}>{pd.provider}</option>
              })
            }
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Bills ({bills?.length})</label>
          <textarea value={bills?.join("\n")} rows={bills?.length} className="form-control" disabled/>
        </div>
        <div>
          <button type="submit" className="btn btn-secondary">Save</button>
          &nbsp;
          <Link href="/invoices" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </>
  )
}
