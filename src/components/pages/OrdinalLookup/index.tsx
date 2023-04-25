import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//TODO: Add address regex validation?

const URL = 'https://blockstream.info/api/address/{lookupId}/utxo'
const inscriptionURL = 'https://api.xverse.app/v1/ordinals/output/{txnId}/{idx}'

const OrdinalLookup = () => {
  const { id } = useParams()
  const [lookupId, setLookupId] = useState<string>(id ?? '')
  const [inscriptions, setInscriptions] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    axios.get<{ txid: string; vout: number }[]>(URL.replace('{lookupId}', id)).then(async res => {
      const results = await Promise.all(
        res.data.map(async ({ txid, vout }) => {
          const inRes = await axios.get<{ id?: string }>(
            inscriptionURL.replace('{txnId}', txid).replace('{idx}', `${vout}`),
          )
          return inRes.data
        }),
      )

      console.log(results)

      setInscriptions(results.filter(r => r) as string[])
    })
  }, [id])

  return (
    <Box>
      <Box>Ordinal Inscription Lookup</Box>
      <Box>Owner Bitcoin Address:</Box>
      <TextField id="outlined-basic" variant="outlined" value={lookupId} onChange={e => setLookupId(e.target.value)} />
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/lookup/${lookupId}`)
        }}
        disabled={lookupId.length === 0}
      >
        Look up
      </Button>
      <Box>Results</Box>
      {inscriptions.map(i => (
        <div
          key={i.id}
          onClick={() => {
            navigate('/nft/' + i.id)
          }}
        >
          {i.id}
        </div>
      ))}
    </Box>
  )
}

export default OrdinalLookup
