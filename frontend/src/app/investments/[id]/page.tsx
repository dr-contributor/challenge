'use client'

import { getInvestment, Investment } from "@/app/api/investment-api"
import { EditInvestment } from "@/app/components/investments/EditInvestment"
import { useEffect, useState } from "react"
import { Investor, investors } from "@/app/api/investor-api"
import { Loading } from "@/app/components/Loading"

export default function page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false)
  const [investment, setInvestment] = useState<Investment>()
  const [investorList, setInvestorList] = useState<Investor[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result: Investment = await getInvestment(params.id)

      setInvestment(result)
      setLoading(false)
    }

    const fetchInvestors = async () => {
      const result: Investor[] = await investors()

      setInvestorList(result)
      setLoading(false)
    }

    fetchData().catch(err => console.log(err))
    fetchInvestors().catch(err => console.log(err))
  }, [])

  return (
    <>
      {
        loading ? 
          <Loading loading={loading} /> :
          <>
            <h1>Edit Investment</h1>
            {investment ? <EditInvestment investment={investment} investors={investorList}/> : <p>No Investment with id {params.id} fround</p>}
          </>
      }
    </>
  )
}
