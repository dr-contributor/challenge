import { Invoice } from "@/app/api/invoice-api";
import Link from 'next/link';

export const InvoiceList = ({ list }: { list: Invoice[] }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <td>Number</td>
              <td>Issued Date</td>
              <td>Due Date</td>
              <td>Investor</td>
              <td>Status</td>
              <td>Pay To</td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {list.length > 0 ? list.map((invoice, i) => {
              return (
                <tr key={i}>
                  <td>{invoice.number}</td>
                  <td>{invoice.issuedDate.toLocaleDateString()}</td>
                  <td>{invoice.dueDate.toLocaleDateString()}</td>
                  <td>{invoice.investorUser?.email}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.paymentDetailsObject?.provider}</td>
                </tr>
              )
            }) : <tr><td colSpan={7}>No Invoice Details Found</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
