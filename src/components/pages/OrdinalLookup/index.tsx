import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//TODO: Add address regex validation?

const URL = 'https://blockstream.info/api/address/bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs/utxo'
const inscriptionURL = 'https://api.xverse.app/v1/ordinals/output/{txnId}/{idx}'

const OrdinalLookup = () => {
  const { id } = useParams()
  const [inscriptions, setInscriptions] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<{ txid: string; vout: number }[]>(URL).then(async res => {
      console.log('1', res.data)
      const results = await Promise.all(
        res.data.map(async ({ txid, vout }) => {
          const inRes = await axios.get<{ id?: string }>(
            inscriptionURL.replace('{txnId}', txid).replace('{idx}', `${vout}`),
          )
          return inRes.data.id
        }),
      )

      setInscriptions(results.filter(r => r) as string[])
    })
  }, [])

  return (
    <Box>
      <Box>Ordinal Inscription Lookup</Box>
      <Box>Owner Bitcoin Address:</Box>
      <TextField id="outlined-basic" variant="outlined" />
      <Button variant="contained">Look up</Button>
      <Box>Results</Box>
      {inscriptions.map(i => (
        <div
          key={i}
          onClick={() => {
            navigate('/nft/' + i)
          }}
        >
          {i}
        </div>
      ))}
    </Box>
  )
}

export default OrdinalLookup
