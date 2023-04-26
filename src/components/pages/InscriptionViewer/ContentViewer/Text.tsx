import axios from 'axios'
import { useEffect, useState } from 'react'

import { CenterDiv, Loader } from '@src/components/atoms'

type Props = {
  contentUrl: string
}

const Text = ({ contentUrl }: Props) => {
  const [content, setContent] = useState('')
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    axios
      .get(contentUrl)
      .then(res => {
        if (typeof res.data === 'string') setContent(res.data)
        else setContent(JSON.stringify(res.data))
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (loading)
    return (
      <CenterDiv>
        <Loader />
      </CenterDiv>
    )
  if (error) return <p>{error}</p>

  return <pre style={{ backgroundColor: 'black', padding: '1rem', whiteSpace: 'pre-wrap' }}>{content}</pre>
}

export default Text
