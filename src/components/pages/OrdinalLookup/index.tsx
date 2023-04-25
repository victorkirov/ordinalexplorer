import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, TextInput, Title } from '@src/components/atoms'

import InscriptionList from './InscriptionList'

const OrdinalLookup = () => {
  const { id } = useParams()
  const [walletId, setLookupId] = useState<string>(id ?? '')

  const navigate = useNavigate()

  const handleLookup = (targetWalletId: string) => {
    if (!targetWalletId) return

    navigate(`/wallet/${targetWalletId}`)
  }

  return (
    <div>
      <Title>Ordinal Inscription Lookup</Title>
      <div>Owner Bitcoin Address:</div>
      <TextInput value={walletId} onChange={e => setLookupId(e.target.value)} onEnter={() => handleLookup(walletId)} />
      <Button
        onClick={() => {
          handleLookup(walletId)
        }}
        disabled={walletId.length === 0}
      >
        Look up
      </Button>
      <InscriptionList walletId={id} />
    </div>
  )
}

export default OrdinalLookup
