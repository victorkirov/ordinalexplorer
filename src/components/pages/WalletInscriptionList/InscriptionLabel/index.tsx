import { useNavigate } from 'react-router-dom'

import { Inscription } from '@src/apiClient'

import css from './InscriptionLabel.module.scss'

type Props = {
  inscription: Inscription
}

const InscriptionLabel = ({ inscription }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className={css.container}
      onClick={() => {
        navigate('/inscription/' + inscription.id)
      }}
    >
      {inscription.inscriptionNumber}

      <div className={css.link} />
    </div>
  )
}

export default InscriptionLabel
