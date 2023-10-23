const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

import { Investor } from "./investor-api"
import { PaymentDetail } from "./payment-details-api"
import moment from "moment"

export interface Invoice {
  id?: string
  number: string
  issuedDate: Date
  dueDate: Date
  investor: number
  investorUser?: Investor
  status: string
  paymentDetails: string
  paymentDetailsObject?: PaymentDetail,
  bills?: string[]
}

export const invoices = async () => {
  console.log(API_ENDPOINT)
  const result: Invoice[] = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices")
    .then((response) => response.json())
    .then((data) => data.invoices.map((invoice: any) => {
      return {
        ...invoice,
        issuedDate: new Date(invoice['issued_date']),
        dueDate: new Date(invoice['due_date']),
        investorUser: {
          ...invoice['investor_user'],
          firstName: invoice['investor_user']['first_name'],
          lastName: invoice['investor_user']['last_name'],
          isActive: invoice['investor_user']['is_active'],
          isStaff: invoice['investor_user']['is_staff'],
        },
        paymentDetails: invoice['payment_details'],
        paymentDetailsObject: invoice['payment_details_object']
      }
    }))
    .catch((err) => console.log(err))

  return result
}

export const createInvoice = async (invoice: Invoice) => {
  const result: Invoice = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "number": invoice.number,
        "issued_date": moment(invoice.issuedDate).format("YYYY-MM-DD"),
        "due_date": moment(invoice.dueDate).format("YYYY-MM-DD"),
        "investor_id": invoice.investor,
        "status": invoice.status,
        "payment_details_id": invoice.paymentDetails,
        "bills": invoice.bills,
      })
    }).then((response) => response.json())
      .then((invoice) => {
        return {
          ...invoice,
          issuedDate: new Date(invoice['issued_date']),
          dueDate: new Date(invoice['due_date']),
          investorUser: {
            ...invoice['investor_user'],
            firstName: invoice['investor_user']['first_name'],
            lastName: invoice['investor_user']['last_name'],
            isActive: invoice['investor_user']['is_active'],
            isStaff: invoice['investor_user']['is_staff'],
          },
          paymentDetails: invoice['payment_details'],
          paymentDetailsObject: invoice['payment_details_object']
        }
      })

  return result
}

export const getInvoice = async (id: String) => {
  const result: Invoice = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices/" + id)
    .then((response) => response.json())
    .catch((err) => console.log(err))

  return result
}

export const cancelInvoice = async (id: String) => {
  const result: Invoice = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices/" + id, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}
