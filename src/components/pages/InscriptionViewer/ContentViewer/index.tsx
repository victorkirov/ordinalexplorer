import { Inscription } from '@src/apiClient'

import Audio from './Audio'
import Html from './Html'
import Image from './Image'
import Model from './Model'
import Text from './Text'
import Video from './Video'

const typeMap: Record<string, ({ contentUrl }: { contentUrl: string }) => JSX.Element> = {
  'text/html': Html,
  'text/plain': Text,
  'image/': Image,
  'video/': Video,
  'audio/': Audio,
  'model/': Model,
}

const ORDINAL_CONTENT_PROVIDER_URL = 'https://ordinals.com'
const createContentUrl = (contentPath: string) => `${ORDINAL_CONTENT_PROVIDER_URL}${contentPath}`

type Props = {
  inscription: Inscription
}
const InscriptionViewer = ({ inscription }: Props) => {
  const Viewer = Object.entries(typeMap).find(([type]) => inscription.contentType.startsWith(type))?.[1]

  if (!Viewer) {
    return <div>!!Unknown content type!!</div>
  }

  return (
    <div style={{ width: 'calc(100% + 2rem)', margin: '0 -1rem' }}>
      <Viewer contentUrl={createContentUrl(inscription.content)} />
    </div>
  )
}

export default InscriptionViewer
