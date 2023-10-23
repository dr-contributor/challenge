"use client"

import { Bill, generateBills } from '@/app/api/bill-api';
import { useRouter } from 'next/navigation';

export const BillList = ({ list }: { list: Bill[] }) => {
  const { push } = useRouter();

  const generateBillsRequest = async () => {
    return await generateBills()
  }

  const onButtonPressed = () => {
    generateBillsRequest()
      .then(result => push('/'))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
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
      </div>
    </>
  )
}
