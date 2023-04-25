import { useParams } from 'react-router-dom'

const OrdinalLookup = () => {
  const { id } = useParams()

  return <span style={{ fontSize: '2rem' }}>Ordinal Lookup {id}</span>
}

export default OrdinalLookup
