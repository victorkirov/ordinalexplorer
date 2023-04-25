import { useNavigate } from 'react-router-dom'

import { Button } from '@components/atoms'

const Error404Page = () => {
  const navigate = useNavigate()

  return (
    <div id="error-page" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <img
        src="https://medcitynews.com/uploads/2018/04/GettyImages-459151625.jpg"
        alt="Lost person in a maze"
        style={{ maxWidth: '100%', marginBottom: '2rem' }}
      />
      <h2>404 NOT FOUND</h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>The page you are looking for could not be found.</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>
    </div>
  )
}

export default Error404Page
