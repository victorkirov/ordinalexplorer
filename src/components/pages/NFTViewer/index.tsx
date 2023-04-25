import { useParams } from 'react-router-dom'

const NFTViewer = () => {
  const { id } = useParams()
  return <span>This will be an NFT {id}</span>
}

export default NFTViewer
