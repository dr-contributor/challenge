export default function page({ params }: { params: { id: string } }) {
  return (
    <h1>Investment {params.id}</h1>
  )
}
