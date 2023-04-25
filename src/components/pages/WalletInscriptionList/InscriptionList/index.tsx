import { useEffect, useState } from 'react'

import { CenterDiv, Loader, SubTitle } from '@components/atoms'
import apiClient, { Inscription } from '@src/apiClient'

import InscriptionLabel from '../InscriptionLabel'

type Props = {
  walletAddress: string | undefined | null
}

const InscriptionList = ({ walletAddress }: Props) => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
    setInscriptions([])

    if (!walletAddress) {
      setLoading(false)
      return
    }

    setLoading(true)

    apiClient
      .getInscriptionsForWallet(walletAddress)
      .then(inscriptionList => {
        inscriptionList.sort((a, b) => a.inscriptionNumber.localeCompare(b.inscriptionNumber))
        setInscriptions(inscriptionList)
      })
      .catch(e => {
        if (e.response?.status === 400) {
          setError('Invalid Bitcoin Address')
        } else {
          setError('Something went wrong')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [walletAddress])

  if (!walletAddress) return null

  if (loading)
    return (
      <CenterDiv>
        <Loader />
      </CenterDiv>
    )
  if (error) return <p>{error}</p>

  return (
    <>
      <SubTitle>Results</SubTitle>
      {inscriptions.length === 0 && <p>No inscriptions found</p>}
      {inscriptions.map(i => (
        <InscriptionLabel key={i.id} inscription={i} />
      ))}
    </>
  )
}

export default InscriptionList
