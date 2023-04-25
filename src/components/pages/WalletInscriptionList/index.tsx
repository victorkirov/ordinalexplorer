import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, TextInput, Title } from '@src/components/atoms'

import InscriptionList from './InscriptionList'

const WalletInscriptionList = () => {
  const { id } = useParams()
  const [walletAddress, setWalletAddress] = useState<string>(id ?? '')

  const navigate = useNavigate()

  const handleLookup = (targetWalletAddress: string) => {
    if (!targetWalletAddress) return

    navigate(`/wallet/${targetWalletAddress}`)
  }

  return (
    <div>
      <Title>Ordinal Inscription Lookup</Title>
      <div>Owner Bitcoin Address:</div>
      <TextInput
        value={walletAddress}
        onChange={e => setWalletAddress(e.target.value)}
        onEnter={() => handleLookup(walletAddress)}
      />
      <Button
        onClick={() => {
          handleLookup(walletAddress)
        }}
        disabled={walletAddress.length === 0}
      >
        Look up
      </Button>
      <InscriptionList walletAddress={id} />
    </div>
  )
}

export default WalletInscriptionList
