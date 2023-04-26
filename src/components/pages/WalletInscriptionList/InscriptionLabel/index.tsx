import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

import { Inscription } from '@src/apiClient'

import css from './InscriptionLabel.module.scss'

type Props = {
  inscription: Inscription
}

const InscriptionLabel = ({ inscription }: Props) => {
  const navigate = useNavigate()

  // This will ensure that we only display the thumbnails if they are in view
  // This is to prevent loading all the images at once and we also don't have access to actual thumbnails, so we
  // would be loading the full size image content. This could be quite big, so we only want to render them if they are
  // visible. Since images are cached on the device, the images will be reused if the user scrolls up and down or opens
  // an inscription to view the contents in full size
  const { ref, inView } = useInView()

  const isImage = inscription.contentType.startsWith('image/')

  return (
    <div
      ref={ref}
      className={css.container}
      onClick={() => {
        navigate('/inscription/' + inscription.id)
      }}
    >
      {isImage && inView && (
        <div className={css.imageContainer}>
          <img src={`https://ordinals.com${inscription.content}`} alt="" className={css.image} />
        </div>
      )}
      {inscription.inscriptionNumber}

      <div className={css.link} />
    </div>
  )
}

export default InscriptionLabel
