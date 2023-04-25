import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CenterDiv, Loader, SubTitle, Title } from '@components/atoms'
import apiClient, { Inscription } from '@src/apiClient'

import Attribute from './Attribute'
import ContentViewer from './ContentViewer'
import Detail from './Detail'

const InscriptionViewer = () => {
  const navigate = useNavigate()

  const { id: ordinalId } = useParams()
  const [inscription, setInscription] = useState<Inscription>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    apiClient
      .getInscriptionForOrdinal(ordinalId!)
      .then(inscriptionData => {
        setInscription(inscriptionData)
      })
      .catch(err => {
        if (err.response?.status === 400) {
          setError('Invalid Ordinal ID')
        } else {
          setError('Something went wrong :(')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [ordinalId])

  return (
    <>
      <Title
        onBack={() => {
          navigate(`/wallet/${inscription?.address}`)
        }}
      >
        Details
      </Title>
      {error && <p>{error}</p>}
      {loading && (
        <CenterDiv>
          <Loader />
        </CenterDiv>
      )}
      {inscription && (
        <>
          <ContentViewer inscription={inscription} />
          <SubTitle bold>{inscription.inscriptionNumber}</SubTitle>
          <hr />
          <Detail title="Inscription ID" value={inscription.id} />
          <Detail title="Owner Address" value={inscription.address} />

          <SubTitle bold>Attributes</SubTitle>
          <Attribute title="Output Value" value={inscription.outputValue} />
          <Attribute title="Content Type" value={inscription.contentType} />
          <Attribute title="Content Length" value={inscription.contentLength} />
          <Attribute title="Location" value={inscription.location} />
          <Attribute title="Genesis Transaction" value={inscription.genesisTransaction.split('/')[2]} />
        </>
      )}
    </>
  )
}

export default InscriptionViewer
