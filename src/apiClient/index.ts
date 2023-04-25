import axios from 'axios'

export type Inscription = {
  inscriptionNumber: string
  id: string
  address: string
  content: string
  contentLength: string
  contentType: string
  genesisFee: string
  genesisHeight: string
  genesisTransaction: string
  location: string
  offset: string
  output: string
  outputValue: string
  timestamp: string
}

type UtxoResponse = {
  txid: string
  value: number
  vout: number
  status: {
    confirmed: boolean
    block_time: number
    block_height: number
    block_hash: string
  }
}[]
const getUnspentOutputsForWallet = async (wallet: string): Promise<UtxoResponse> => {
  const res = await axios.get<UtxoResponse>(`https://blockstream.info/api/address/${wallet}/utxo`)
  return res.data
}

type OrdinalResponse =
  | {
      id?: string
    }
  | undefined
const getOrindalForUnspentOutput = async (utxoId: string, outputIndex: number): Promise<string | undefined> => {
  const res = await axios.get<OrdinalResponse>(`https://api.xverse.app/v1/ordinals/output/${utxoId}/${outputIndex}`)
  return res.data?.id
}

type InscriptionResponse = {
  inscriptionNumber: string
  metadata: {
    'address': string
    'content': string
    'content length': string
    'content type': string
    'genesis fee': string
    'genesis height': string
    'genesis transaction': string
    'id': string
    'location': string
    'offset': string
    'output': string
    'output value': string
    'preview': string
    'timestamp': string
  }
}
const getInscriptionForOrdinal = async (ordinalId: string): Promise<Inscription> => {
  const resp = await axios.get<InscriptionResponse>(`https://api.xverse.app/v1/ordinals/${ordinalId}`)

  const inscription = resp.data

  return {
    inscriptionNumber: inscription.inscriptionNumber,
    id: inscription.metadata.id,
    address: inscription.metadata.address,
    content: inscription.metadata.content,
    contentLength: inscription.metadata['content length'],
    contentType: inscription.metadata['content type'],
    genesisFee: inscription.metadata['genesis fee'],
    genesisHeight: inscription.metadata['genesis height'],
    genesisTransaction: inscription.metadata['genesis transaction'],
    location: inscription.metadata.location,
    offset: inscription.metadata.offset,
    output: inscription.metadata.output,
    outputValue: inscription.metadata['output value'],
    timestamp: inscription.metadata.timestamp,
  }
}

const getInscriptionsForWallet = async (wallet: string): Promise<Inscription[]> => {
  const unspentOutputs = await getUnspentOutputsForWallet(wallet)

  const ordinals = await Promise.all(
    unspentOutputs.map(async utxo => {
      const ordinal = await getOrindalForUnspentOutput(utxo.txid, utxo.vout)
      return ordinal
    }),
  )

  const inscriptions = await Promise.all(
    ordinals
      .filter(ordinal => ordinal)
      .map(async ordinal => {
        const inscription = await getInscriptionForOrdinal(ordinal!)
        return inscription
      }),
  )

  return inscriptions
}

export default { getInscriptionsForWallet, getInscriptionForOrdinal }
