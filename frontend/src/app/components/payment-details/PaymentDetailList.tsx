import { PaymentDetail } from "@/app/api/payment-details-api";
import Link from 'next/link';

export const PaymentDetailList = ({ list }: { list: PaymentDetail[] }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <td>IBAN</td>
              <td>Provider</td>
              <td>Address</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {list.length > 0 ? list.map((pd, i) => {
              return (
                <tr key={i}>
                  <td>{pd.iban}</td>
                  <td>{pd.provider}</td>
                  <td>{pd.address}</td>
                  <td>
                    <Link href={`/payment-details/${pd.id}`} className="btn btn-secondary">Edit</Link>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan={7}>No Investments Found</td></tr>}
          </tbody>
        </table>
        <Link href="/payment-details/new" className="btn btn-secondary">Create</Link>
      </div>
    </>
  )
}
