// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import {Auth} from "../../../models/Auth";
import {Alert} from "@mui/lab";
import {useRouter} from "next/router";
import NetworkConfig from "../../../configs/networkConfig";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const RegisterV1 = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [isChecked, setCheck] = useState(false)
  const [error, setError] = useState("")

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const onSubmit = async () => {
    if (!isChecked) return setError("You need to valid the privacy policy and terms !")
    try {
      let result = await Auth.register(username, email, values.password)

      if (result === true) {
        await router.replace("/auth/login")
      } else {
        setError("Something wrong happen...")
      }
    } catch (e) {
      console.log(e)
      setError("Something wrong happen...")
    }
  }

  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width={34} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d="M29.9996 6.31812L23.2727 13.045L29.9514 19.7362L25.6202 24.0675L7.91895 6.36562L12.2496 2.03375L18.9414 8.71375L25.6664 2L29.9996 6.31812Z"
                  fill="#685DD7"/>
                <path
                  d="M2.03437 12.2498L6.36562 7.91797L24.0669 25.6205L19.7356 29.9517L13.0481 23.2723L6.3175 29.9998L2 25.6667L8.71375 18.9411L2.03437 12.2498Z"
                  fill="#685DD7"/>
              </svg>
              <Typography variant='h3' sx={{ml: 2.5, fontWeight: 700}}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{mb: 3}}>
              <Typography variant='h4' sx={{mb: 1.5}}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{color: 'text.secondary'}}>Make your app management easy and fun!</Typography>
            </Box>
            {(error.length !== 0) ?
              <Alert variant='filled' severity='error' sx={{mb: 3}}>
                {error}
              </Alert> : null}
            <form noValidate autoComplete='off' onSubmit={e => {
              e.preventDefault()
              onSubmit()
            }}>
              <CustomTextField
                autoFocus
                fullWidth
                id='username'
                sx={{ mb: 4 }}
                label='Username'
                placeholder='John.doe'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <CustomTextField
                fullWidth type='email'
                label='Email'
                sx={{ mb: 4 }}
                placeholder='john.doe@gmail.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <CustomTextField
                fullWidth
                label='Password'
                value={values.password}
                placeholder='············'
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={<Checkbox value={isChecked} onChange={(e) => setCheck(e.target.checked)} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary' }}>I agree to </Typography>
                    <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                      privacy policy & terms
                    </Typography>
                  </Box>
                }
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography
                  component={LinkStyled}
                  href='/auth/login'
                  sx={{ fontSize: theme.typography.body1.fontSize }}
                >
                  Sign in instead
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  href={NetworkConfig.url + "/auth/login/github"}
                  component={Link}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href={NetworkConfig.url + "/auth/login/google"} component={Link} sx={{ color: '#db4437' }}>
                  <Icon icon='mdi:google' />
                </IconButton>
                <IconButton href={NetworkConfig.url + "/auth/login/discord"} component={Link} sx={{ color: '#7289da' }}>
                  <Icon icon='mdi:discord' />
                </IconButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}
RegisterV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
RegisterV1.needAuth = false

export default RegisterV1
