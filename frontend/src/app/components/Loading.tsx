import { Bars } from "react-loader-spinner"

export const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {
        loading ?
        <>
          <div className="loading">
            <h2>Loading... </h2>
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={loading}
            />
          </div> 
          <div className="loading-modal"></div>
        </>
        :
        <></>
      }
    </>
  )
}
