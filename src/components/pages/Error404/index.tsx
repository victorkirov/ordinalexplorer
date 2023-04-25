import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Error404Page = () => {
  const navigate = useNavigate()

  return (
    <div id="error-page" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <img src="TODO" alt="Lost person in a maze" style={{ maxWidth: '100%', marginBottom: '2rem' }} />
      <h1 style={{ fontSize: '4rem' }}>404 NOT FOUND</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>The page you are looking for could not be found.</p>
      <Button onClick={() => navigate(-1)} variant="contained" size="large" sx={{ marginRight: 1 }}>
        Back
      </Button>
      <Button onClick={() => navigate('/')} variant="contained" size="large">
        Home
      </Button>
    </div>
  )
}

export default Error404Page
