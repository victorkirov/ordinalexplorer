import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router-dom'

type RouterError =
  | {
      message: string
    }
  | undefined

const ErrorPage = () => {
  const navigate = useNavigate()
  const error = useRouteError() as RouterError

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="5rem">
      <img src="TODO" alt="Confused person" style={{ maxWidth: '100%', marginBottom: '2rem' }} />
      <Typography variant="h2" marginBottom="2rem">
        Something went wrong
      </Typography>
      <Typography variant="h6" marginBottom="2rem">
        {error?.message}
      </Typography>
      <Button onClick={() => navigate(-1)} variant="contained" size="large" sx={{ marginRight: 1 }}>
        Back
      </Button>
      <Button onClick={() => navigate('/')} variant="contained" size="large">
        Home
      </Button>
    </Box>
  )
}

export default ErrorPage
