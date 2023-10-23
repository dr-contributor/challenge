"use client"

import { useEffect, useState } from "react"
import { Bill, bills } from "@/app/api/bill-api"
import { BillList } from "../components/bills/BillList"
import { investors, Investor } from "../api/investor-api"
import { Loading } from "../components/Loading"
import InvestorSelection from "../components/bills/InvestorSelection"

export default function page() {
  const [loading, setLoading] = useState(false)
  const [investorList, setInvestorList] = useState<Investor[]>([])
  const [billList, setBillList] = useState<Bill[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result: Bill[] = await bills()

      setBillList(result)
    }

    const fetchInvestors = async () => {
      const result: Investor[] = await investors()

      setInvestorList(result)
      setLoading(false)
    }

    fetchData().catch(err => console.log(err))
    fetchInvestors().catch(err => console.log(err))
  }, [])

  const onInvestorChange = async (investorId: string) => {
    const result: Bill[] = await bills(investorId)

    setBillList(result)
  }

  return (
    <>
      {
        loading ? 
          <Loading loading={loading} /> :
          <>
            <h1>Bills</h1>
            <InvestorSelection list={investorList} onInvestorChange={onInvestorChange} />
            <BillList list={billList} />
          </>
      }
    </>
  )
}
