"use client"

import { Bill, generateBills } from '@/app/api/bill-api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export const BillList = ({ list }: { list: Bill[] }) => {
  const { push } = useRouter();
  const [bills, setBills] = useState<string[]>([])
  const [investorId, setInvestorId] = useState<string>()

  const generateBillsRequest = async () => {
    return await generateBills()
  }

  const onButtonPressed = () => {
    generateBillsRequest()
      .then(result => push('/'))
      .catch(err => console.log(err))
  }

  const addBill = (event: { target: { checked: boolean } }, billId: string, investorId: string) => {
    setInvestorId(investorId)
    if (event.target.checked) {
      setBills([...bills, billId])
    } else {
      setBills(bills.filter(id => id !== billId))
    }
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <td>Select</td>
              <td>Bill Type</td>
              <td>Total</td>
              <td>Date</td>
              <td>Investor</td>
              <td>Investment</td>
              <td>Invoice</td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {list.length > 0 ? list.map((bill, i) => {
              return (
                <tr key={i}>
                  <td>{bill.invoiceObject?.number === undefined ? <input type="checkbox" onChange={(event) => addBill(event, bill.id!, bill.investor)}/> : <></>}</td>
                  <td>{bill.billType}</td>
                  <td>{bill.total.toLocaleString()}</td>
                  <td>{bill.date.toLocaleDateString()}</td>
                  <td>{bill.investorUser?.email}</td>
                  <td>{bill.investmentObject?.name}</td>
                  <td>{bill.invoiceObject?.number}</td>
                </tr>
              )
            }) : <tr><td colSpan={7}>No Bills Found</td></tr>}
          </tbody>
        </table>
        <button className='btn btn-secondary' onClick={onButtonPressed}>Generate Bills</button>
        &nbsp;
        <Link href={`/invoices/new?investor=${investorId}&bills=${bills}`} className="btn btn-secondary">Create Capital Call</Link>
      </div>
    </>
  )
}
