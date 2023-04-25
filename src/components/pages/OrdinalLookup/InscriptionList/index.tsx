import { useEffect, useState } from 'react'

import { CenterDiv, Loader, SubTitle } from '@components/atoms'
import apiClient, { Inscription } from '@src/apiClient'

import InscriptionLabel from '../InscriptionLabel'

type Props = {
  walletId: string | undefined | null
}

const InscriptionList = ({ walletId }: Props) => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
    setInscriptions([])

    if (!walletId) {
      setLoading(false)
      return
    }

    setLoading(true)

    apiClient
      .getInscriptionsForWallet(walletId)
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
  }, [walletId])

  if (!walletId) return null

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
      {inscriptions.map(i => (
        <InscriptionLabel key={i.id} inscription={i} />
      ))}
    </>
  )
}

export default InscriptionList
