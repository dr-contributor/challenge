"use client"

import { useEffect, useState } from "react"
import { Bill, bills } from "@/app/api/bill-api"
import { BillList } from "../components/bills/BillList"

export default function page() {
  const [billList, setBillList] = useState<Bill[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result: Bill[] = await bills()

      setBillList(result)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Bills</h1>
      <BillList list={billList} />
    </>
  )
}
