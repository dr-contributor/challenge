const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

export interface Investment {
  id?: String
  name: String
  description: String
  upfrontFees: Boolean
  feePercentage: Number
  amountInvested: Number
  investor: Number
  createdAt: Date
  updatedAt: Date
}

export const investments = async () => {
  console.log(API_ENDPOINT)
  const result: Investment[] = await fetch(API_ENDPOINT + "/invoice/api/v1/investments")
    .then((response) => response.json())
    .then((data) => data.investments.map((investment: any) => {
      return {
        ...investment,
        upfrontFees: investment['upfront_fees'],
        feePercentage: investment['fee_percentage'],
        amountInvested: investment['amount_invested'],
        createdAt: investment['created_at'],
        updatedAt: investment['updated_at'],
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
          feePercentage: investment['fee_percentage'],
          amountInvested: investment['amount_invested'],
          createdAt: investment['created_at'],
          updatedAt: investment['updated_at'],
        }
      })
      .catch((err) => console.log(err))

  return result
}

export const getInvestment = async (id: String) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments/" + id)
    .then((response) => response.json())
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
          feePercentage: investment['fee_percentage'],
          amountInvested: investment['amount_invested'],
          createdAt: investment['created_at'],
          updatedAt: investment['updated_at'],
        }
      })
      .catch((err) => console.log(err))

  return result
}

export const deleteInvestment = async (id: String) => {
  const result: Investment = await fetch(API_ENDPOINT + "/invoice/api/v1/investments/" + id, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}
