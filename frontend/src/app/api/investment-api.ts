const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

import { Investor } from "./investor-api"

export interface Investment {
  id?: string
  name: string
  description: string
  upfrontFees: boolean
  feePercentage: number
  amountInvested: number
  investor: number
  investorUser?: Investor
  createdAt?: Date
  updatedAt?: Date
}

export const investments = async () => {
  const result: Investment[] = await fetch(API_ENDPOINT + "/invoice/api/v1/investments")
    .then((response) => response.json())
    .then((data) => data.investments.map((investment: any) => {
      return {
        ...investment,
        upfrontFees: investment['upfront_fees'],
        feePercentage: new Number(investment['fee_percentage']),
        amountInvested: new Number(investment['amount_invested']),
        createdAt: new Date(investment['created_at']),
        updatedAt: new Date(investment['updated_at']),
        investorUser: {
          ...investment['investor_user'],
          firstName: investment['investor_user']['first_name'],
          lastName: investment['investor_user']['last_name'],
          isActive: investment['investor_user']['is_active'],
          isStaff: investment['investor_user']['is_staff'],
        }
      }
    })).catch((err) => console.log(err))

  return result
}

export const createInvestment = async (investment: Investment) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": investment.name,
        "description": investment.description,
        "upfront_fees": investment.upfrontFees,
        "fee_percentage": investment.feePercentage,
        "amount_invested": investment.amountInvested,
        "investor_id": investment.investor
      })
    }).then((response) => response.json())
      .then((investment) => {
        return {
          ...investment,
          upfrontFees: investment['upfront_fees'],
          feePercentage: new Number(investment['fee_percentage']),
          amountInvested: new Number(investment['amount_invested']),
          createdAt: new Date(investment['created_at']),
          updatedAt: new Date(investment['updated_at']),
          investorUser: {
            ...investment['investor_user'],
            firstName: investment['investor_user']['first_name'],
            lastName: investment['investor_user']['last_name'],
            isActive: investment['investor_user']['is_active'],
            isStaff: investment['investor_user']['is_staff'],
          }
        }
      })

  return result
}

export const getInvestment = async (id: string) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments/" + id)
    .then((response) => response.json())
    .then((investment) => {
      return {
        ...investment,
        upfrontFees: investment['upfront_fees'],
        feePercentage: new Number(investment['fee_percentage']),
        amountInvested: new Number(investment['amount_invested']),
        createdAt: new Date(investment['created_at']),
        updatedAt: new Date(investment['updated_at']),
        investorUser: {
          ...investment['investor_user'],
          firstName: investment['investor_user']['first_name'],
          lastName: investment['investor_user']['last_name'],
          isActive: investment['investor_user']['is_active'],
          isStaff: investment['investor_user']['is_staff'],
        }
      }
  })
    .catch((err) => console.log(err))

  return result
}

export const updateInvestment = async (investment: Investment) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments/" + investment.id, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": investment.name,
        "description": investment.description,
        "upfront_fees": investment.upfrontFees,
        "fee_percentage": investment.feePercentage,
        "amount_invested": investment.amountInvested,
        "investor_id": investment.investor
      })
    }).then((response) => response.json())
      .then((investment) => {
        return {
          ...investment,
          upfrontFees: investment['upfront_fees'],
          feePercentage: new Number(investment['fee_percentage']),
          amountInvested: new Number(investment['amount_invested']),
          createdAt: new Date(investment['created_at']),
          updatedAt: new Date(investment['updated_at']),
          investorUser: {
            ...investment['investor_user'],
            firstName: investment['investor_user']['first_name'],
            lastName: investment['investor_user']['last_name'],
            isActive: investment['investor_user']['is_active'],
            isStaff: investment['investor_user']['is_staff'],
          }
        }
      })

  return result
}

export const deleteInvestment = async (id: string) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments/" + id, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}
