const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

export interface Invoice {
  id?: String
  number: String
  issuedDate: Date
  dueDate: Date
  investor: Number
  status: String
  paymentDetails: String
}

export const invoices = async () => {
  console.log(API_ENDPOINT)
  const result: Invoice[] = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices")
    .then((response) => response.json())
    .then((data) => data.invoices)
    .catch((err) => console.log(err))

  return result
}

export const createInvestment = async (invoice: Invoice) => {
  const result: Invoice = await fetch(API_ENDPOINT + "/invoice/api/v1/invoices", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "number": invoice.number,
        "issue_date": invoice.issuedDate,
        "due_date": invoice.dueDate,
        "investor_id": invoice.investor,
        "status": invoice.status,
        "payment_details": invoice.paymentDetails,
      })
    }).then((response) => response.json())
      .then((invoice) => {
        return {
          ...invoice,
          dueDate: invoice['due_date'],
          issuedDate: invoice['issue_date'],
          paymentDetails: invoice['payment_details'],
        }
      })
      .catch((err) => console.log(err))

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
