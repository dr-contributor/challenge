const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

export interface PaymentDetail {
  id?: string
  iban: string
  provider: string
  address: string
}

export const paymentDetails = async () => {
  console.log(API_ENDPOINT)
  const result: PaymentDetail[] = await fetch(API_ENDPOINT + "/invoice/api/v1/payment-details")
    .then((response) => response.json())
    .then((data) => data.payment_details)
    .catch((err) => console.log(err))

  return result
}

export const createPaymentDetail = async (paymentDetail: PaymentDetail) => {
  const result: PaymentDetail = await fetch(API_ENDPOINT + "/invoice/api/v1/payment-details", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "iban": paymentDetail.iban,
        "provider": paymentDetail.provider,
        "address": paymentDetail.address,
      })
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}

export const getPaymentDetail = async (id: String) => {
  const result: PaymentDetail = await fetch(API_ENDPOINT + "/invoice/api/v1/payment-details/" + id)
    .then((response) => response.json())
    .catch((err) => console.log(err))

  return result
}

export const updatePaymentDetail = async (paymentDetail: PaymentDetail) => {
  const result: PaymentDetail = await fetch(API_ENDPOINT + "/invoice/api/v1/payment-details/" + paymentDetail.id, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "iban": paymentDetail.iban,
        "provider": paymentDetail.provider,
        "address": paymentDetail.address,
      })
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}

export const deletePaymentDetail = async (id: String) => {
  const result: PaymentDetail = await fetch(API_ENDPOINT + "/invoice/api/v1/payment-details/" + id, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .catch((err) => console.log(err))

  return result
}
