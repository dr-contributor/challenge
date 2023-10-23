"use client"

import { Investment, createInvestment, updateInvestment } from "@/app/api/investment-api"
import { Loading } from "@/app/components/Loading"
import Link from "next/link"
import { useState } from "react"
import { Investor } from "@/app/api/investor-api"
import { useRouter } from 'next/navigation';
import { Notification } from "../Notification"

export const CreateInvestment = ({ investors }: { investors: Investor[] }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [upfrontFees, setUpfrontFees] = useState(false)
  const [feePercentage, setFeePercentage] = useState(0.0)
  const [amountInvested, setAmountInvested] = useState(0)
  const [investorId, setInvestorId] = useState(1)
  const { push } = useRouter();
  const [notification, setNotification] = useState("")
  const [notificationType, setNotificationType] = useState("")

  const onNameChange = (event: { target: { value: string } }) => {
    setName(event.target.value)
  }

  const onDescriptionChange = (event: { target: { value: string } }) => {
    setDescription(event.target.value)
  }

  const onUpfrontFeesChange = (event: { target: { checked: boolean } }) => {
    setUpfrontFees(event.target.checked)
  }

  const onFeePercentageChange = (event: { target: { value: string } }) => {
    setFeePercentage(+event.target.value)
  }

  const onAmountInvestedChange = (event: { target: { value: string } }) => {
    setAmountInvested(+event.target.value)
  }

  const onInvestorChange = (event: { target: { value: string } }) => {
    setInvestorId(+event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setLoading(true)
    event.preventDefault();
    
    const newInvestment: Investment = {
      name,
      description,
      upfrontFees,
      feePercentage,
      amountInvested,
      investor: investorId
    }

    const performUpdate = async () => {
      return await createInvestment(newInvestment)
    }

    performUpdate()
    .then(result => push("/investments"))
    .catch(err => {
      setNotification("Investment could not be created")
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
          <input type="text" value={name} name="name" className="form-control" onChange={onNameChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea value={description} name="description" className="form-control" onChange={onDescriptionChange}/>
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" id="upfrontFees">Upfront Fees</label>
          <input type="checkbox" checked={upfrontFees} name="upfront_fees" className="form-check-input" onChange={onUpfrontFeesChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Fee %</label>
          <input type="number" value={feePercentage} name="fee_percentage" className="form-control" min={0} max={1} step="0.01" onChange={onFeePercentageChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount Invested</label>
          <input type="number" value={amountInvested} name="amount_invested" className="form-control" onChange={onAmountInvestedChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Investor</label>
          <select className="form-select" onChange={onInvestorChange} defaultValue={investorId}>
            {
              investors?.map((investor, i) => {
                return <option key={i} value={investor.id}>{investor.email}</option>
              })
            }
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-secondary">Save</button>
          &nbsp;
          <Link href="/investments" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </>
  )
}
