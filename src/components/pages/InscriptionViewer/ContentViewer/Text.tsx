import axios from 'axios'
import { useEffect, useState } from 'react'

type Props = {
  contentUrl: string
}

const Text = ({ contentUrl }: Props) => {
  const [content, setContent] = useState('')
  useEffect(() => {
    axios.get(contentUrl).then(res => {
      if (typeof res.data === 'string') setContent(res.data)
      else setContent(JSON.stringify(res.data))
    })
  }, [])

  return <pre style={{ backgroundColor: 'black', padding: '1rem', whiteSpace: 'pre-wrap' }}>{content}</pre>
}

export default Text
