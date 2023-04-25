import { useNavigate, useRouteError } from 'react-router-dom'

import { Button } from '@components/atoms'

type RouterError =
  | {
      message: string
    }
  | undefined

const ErrorPage = () => {
  const navigate = useNavigate()
  const error = useRouteError() as RouterError

  return (
    <div>
      <img
        src="https://img.freepik.com/premium-vector/young-good-looking-man-doing-confused-pose_97632-4174.jpg"
        alt="Confused person"
        style={{ maxWidth: '100%', marginBottom: '2rem' }}
      />
      <h2>Something went wrong</h2>
      <p>{error?.message}</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>
    </div>
  )
}

export default ErrorPage
