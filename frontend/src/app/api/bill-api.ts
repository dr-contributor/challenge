const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

export interface Bill {
  id?: String
  bill_type: String
  total: Number
  date: Date
  investor: Number
  investment: String
  invoice: String
  createdAt: Date
}

export const bills = async () => {
  console.log(API_ENDPOINT)
  const result: Bill[] = await fetch(API_ENDPOINT + "/invoice/api/v1/bills")
    .then((response) => response.json())
    .then((data) => data.bills)
    .catch((err) => console.log(err))

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
