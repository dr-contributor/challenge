export default function page({ params }: { params: { id: string } }) {
  return (
    <h1>Payment Detail {params.id}</h1>
  )
}
