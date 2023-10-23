import { Investment, updateInvestment } from "@/app/api/investment-api"
import { Loading } from "@/app/components/Loading"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Notification } from "../Notification"
import { PaymentDetail, updatePaymentDetail } from "@/app/api/payment-details-api"

export const EditPaymentDetails = ({ paymentDetail }: { paymentDetail: PaymentDetail }) => {
  const [loading, setLoading] = useState(false)
  const [iban, setIban] = useState(paymentDetail.iban)
  const [provider, setProvider] = useState(paymentDetail.provider)
  const [address, setAddress] = useState(paymentDetail.address)
  const [notification, setNotification] = useState("")
  const [notificationType, setNotificationType] = useState("")
  const { push } = useRouter();

  const onIbanChange = (event: { target: { value: string } }) => {
    setIban(event.target.value)
  }
  const onProviderChange = (event: { target: { value: string } }) => {
    setProvider(event.target.value)
  }
  const onAddressChange = (event: { target: { value: string } }) => {
    setAddress(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setLoading(true)
    event.preventDefault();
    
    const updatedPaymentDetail: PaymentDetail = {
      id: paymentDetail.id,
      iban,
      provider,
      address
    }

    const performUpdate = async () => {
      return await updatePaymentDetail(updatedPaymentDetail)
    }

    performUpdate()
    .then(result => push("/payment-details"))
    .catch(err => {
      setNotification("Investment could not be updated")
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
          <label className="form-label">Name</label>
          <input type="text" value={iban} name="name" className="form-control" onChange={onIbanChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Provider</label>
          <input type="text" value={provider} name="name" className="form-control" onChange={onProviderChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" value={address} name="name" className="form-control" onChange={onAddressChange} />
        </div>
        <div>
          <button type="submit" className="btn btn-secondary">Save</button>
          &nbsp;
          <Link href="/payment-details" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </>
  )
}
