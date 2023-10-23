'use client'

import { investments, Investment } from "@/app/api/investment-api"
import { InvestmentList } from "../components/investments/InvestmentList"
import { useEffect, useState } from "react"

export default function page() {
  const [investmentList, setInvestmentList] = useState<Investment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result: Investment[] = await investments()

      setInvestmentList(result)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Investments</h1>
      <InvestmentList list={investmentList} />
    </>
  )
}
