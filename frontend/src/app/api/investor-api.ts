const API_ENDPOINT=process.env.REACT_APP_API_ENDPOINT === undefined ? 'http://localhost:8000' : process.env.API_URL

export interface Investor {
  id?: number
  email: string
  username: string
  firstName: string
  lastName: string
  isActive: boolean
  isStaff: boolean
}

export const investors = async () => {
  const result: Investor[] = await fetch(API_ENDPOINT + "/invoice/api/v1/investors")
    .then((response) => response.json())
    .then((data) => data.investors.map((investor: any) => {
      return {
        ...investor,
        firstName: investor['first_name'],
        lastName: investor['last_name'],
        isActive: investor['is_active'],
        isStaff: investor['is_staff'],
      }
    })).catch((err: any) => console.log(err))

  return result
}
