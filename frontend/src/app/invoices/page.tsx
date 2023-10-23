"use client"

import { useEffect, useState } from "react"
import { Invoice, invoices } from "@/app/api/invoice-api"
import { InvoiceList } from "../components/invoices/InvoiceList"

export default function page() {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result: Invoice[] = await invoices()

      setInvoiceList(result)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Capital Calls</h1>
      <InvoiceList list={invoiceList} />
    </>
  )
}
