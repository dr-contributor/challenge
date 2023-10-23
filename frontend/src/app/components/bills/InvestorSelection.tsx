
import { Investor } from "@/app/api/investor-api";
import { useEffect } from "react";

export default function InvestorSelection(
  {
    list,
    onInvestorChange
  }: 
  {
    list: Investor[],
    onInvestorChange: (investorId: string) => void
  }) {
    const onInvestorSelected = (event: { target: { value: any; }; }) => {
      onInvestorChange(event.target.value)
    }

    useEffect(() => {
      const investorId = list[0]?.id?.toString()

      if (investorId){
        onInvestorChange(investorId)
      }
    }, [list])

    return (
      <div className="investor-selection">
        <label className="form-label">Investor</label>
        <select className="form-select" onChange={onInvestorSelected} defaultValue={list[0]?.id}>
          {
            list?.map((investor, i) => {
              return <option key={i} value={investor.id}>{investor.email}</option>
            })
          }
        </select>
      </div>
    )
}
