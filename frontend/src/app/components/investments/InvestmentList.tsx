import { investments, Investment } from "@/app/api/investment-api"
import Link from 'next/link';

export const InvestmentList = ({ list }: { list: Investment[] }) => {
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
            {list.length > 0 ? list.map((inv, i) => {
              return (
                <tr key={i}>
                  <td>{inv.name}</td>
                  <td>{inv.upfrontFees ? "True" : "False"}</td>
                  <td>{inv.feePercentage.toLocaleString()}</td>
                  <td>{inv.amountInvested.toLocaleString()}</td>
                  <td>{inv.investorUser?.email}</td>
                  <td>{inv.createdAt?.toDateString()}</td>
                  <td>
                    <Link href={`/investments/${inv.id}`} className="btn btn-secondary">Edit</Link>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan={7}>No Investments Found</td></tr>}
          </tbody>
        </table>
        <Link href="/investments/new" className="btn btn-secondary">Create</Link>
      </div>
    </>
  )
}
