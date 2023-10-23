'use client'

import { useEffect, useState } from "react"
import { Investor, investors } from "@/app/api/investor-api"
import { Loading } from "@/app/components/Loading"
import { CreateInvestment } from "@/app/components/investments/CreateInvestment"

export default function page() {
  const [loading, setLoading] = useState(false)
  const [investorList, setInvestorList] = useState<Investor[]>([])

  useEffect(() => {
    const fetchInvestors = async () => {
      const result: Investor[] = await investors()

      setInvestorList(result)
      setLoading(false)
    }

    fetchInvestors().catch(err => console.log(err))
  }, [])

  return (
    <>
      {
        loading ? 
          <Loading loading={loading} /> :
          <>
            <h1>New Investment</h1>
            <CreateInvestment investors={investorList}/>
          </>
      }
    </>
  )
}
