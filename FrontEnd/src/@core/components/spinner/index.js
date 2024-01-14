// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg width={82} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d="M29.9996 6.31812L23.2727 13.045L29.9514 19.7362L25.6202 24.0675L7.91895 6.36562L12.2496 2.03375L18.9414 8.71375L25.6664 2L29.9996 6.31812Z"
          fill="#685DD7"/>
        <path
          d="M2.03437 12.2498L6.36562 7.91797L24.0669 25.6205L19.7356 29.9517L13.0481 23.2723L6.3175 29.9998L2 25.6667L8.71375 18.9411L2.03437 12.2498Z"
          fill="#685DD7"/>
      </svg>
      <CircularProgress disableShrink sx={{mt: 6}}/>
    </Box>
  )
}

export default FallbackSpinner
