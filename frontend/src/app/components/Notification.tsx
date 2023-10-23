export const Notification = ({ message, type = "danger" }: { message?: string, type?: string }) => {
  return (
    <>
      {
        message ?
        <>
          <div className={`alert alert-${type}`}>{message}</div>
        </>
        :
        <></>
      }
    </>
  )
}
