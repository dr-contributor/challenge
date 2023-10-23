'use client'

import { investments, Investment } from "@/app/api/investment-api"
import { useEffect, useState } from "react"
import Link from 'next/link';

export const InvestmentList = () => {
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
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <td>Name</td>
              <td>Upfront Fees</td>
              <td>Fee %</td>
              <td>Amount Invested</td>
              <td>Investor</td>
              <td>Invested At</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {investmentList.map((inv, i) => {
              return (
                <tr key={i}>
                  <td>{inv.name}</td>
                  <td>{inv.upfrontFees ? "True" : "False"}</td>
                  <td>{inv.feePercentage.toLocaleString()}</td>
                  <td>{inv.amountInvested.toLocaleString()}</td>
                  <td>{inv.investorUser.email}</td>
                  <td>{inv.createdAt.toDateString()}</td>
                  <td>
                    <Link href="/" className="btn btn-secondary">Edit</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
