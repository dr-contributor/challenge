const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

import { Investor } from "./investor-api"
import { Investment } from "./investment-api"

interface BillInvoice {
  id?: string
  number: string
}

export interface Bill {
  id?: string
  billType: string
  total: number
  date: Date
  investor: number
  investorUser?: Investor
  investment?: string
  investmentObject?: Investment
  invoice?: string
  invoiceObject?: BillInvoice
  createdAt?: Date
  updatedAt?: Date
}

export const bills = async (investorId?: string) => {
  const query = investorId !== undefined ? "?investor=" + investorId : ""
  const result: Bill[] = await fetch(API_ENDPOINT + "/invoice/api/v1/bills" + query)
    .then((response) => response.json())
    .then((data) => data.bills.map((bill: any) => {
      const investmentObject = bill['investment_object'] ? {
        ...bill['investment_object'],
        upfrontFees: bill['investment_object']['upfront_fees'],
        feePercentage: new Number(bill['investment_object']['fee_percentage']),
        amountInvested: new Number(bill['investment_object']['amount_invested']),
        createdAt: new Date(bill['investment_object']['created_at']),
        updatedAt: new Date(bill['investment_object']['updated_at']),
        investorUser: {
          ...bill['investment_object']['investor_user'],
          firstName: bill['investment_object']['investor_user']['first_name'],
          lastName: bill['investment_object']['investor_user']['last_name'],
          isActive: bill['investment_object']['investor_user']['is_active'],
          isStaff: bill['investment_object']['investor_user']['is_staff'],
        }
      } : {}

      return {
        ...bill,
        date: new Date(bill['date']),
        total: new Number(bill['total']),
        billType: bill['bill_type'],
        createdAt: new Date(bill['created_at']),
        updatedAt: new Date(bill['updated_at']),
        investorUser: {
          ...bill['investor_user'],
          firstName: bill['investor_user']['first_name'],
          lastName: bill['investor_user']['last_name'],
          isActive: bill['investor_user']['is_active'],
          isStaff: bill['investor_user']['is_staff'],
        },
        investmentObject,
        invoiceObject: bill['invoice_object']
      }
    })).catch((err: any) => console.log(err))

  return result
}

export const generateBills = async () => {
  const result: Bill = await fetch(API_ENDPOINT + "/invoice/api/v1/bills/generate", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}
