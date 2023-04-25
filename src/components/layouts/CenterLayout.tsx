import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const CenterLayout = () => {
  return (
    <Box flexDirection="column" display="flex" alignItems="center" width="100vw" height="100vh">
      {/* TODO: figure out max width*/}
      <Box maxWidth="10rem" height="100vh">
        <Outlet />
      </Box>
    </Box>
  )
}

export default CenterLayout
