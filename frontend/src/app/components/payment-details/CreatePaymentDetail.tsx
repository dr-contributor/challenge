import { Loading } from "@/app/components/Loading"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Notification } from "../Notification"
import { PaymentDetail, createPaymentDetail, updatePaymentDetail } from "@/app/api/payment-details-api"

export const CreatePaymentDetail = () => {
  const [loading, setLoading] = useState(false)
  const [iban, setIban] = useState("")
  const [provider, setProvider] = useState("")
  const [address, setAddress] = useState("")
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
    
    const newPaymentDetail: PaymentDetail = {
      iban,
      provider,
      address
    }

    const performCreate = async () => {
      return await createPaymentDetail(newPaymentDetail)
    }

    performCreate()
      .then(result => push("/payment-details"))
      .catch(err => {
        setNotification("Payment detail could not be created")
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
          <label className="form-label">IBAN</label>
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
