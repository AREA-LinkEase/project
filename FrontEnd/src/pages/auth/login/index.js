// ** React Imports
import {useContext, useEffect, useState} from 'react'

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
import {useRouter} from "next/router";
import {Alert} from "@mui/material";
import {Auth} from "../../../models/Auth";
import {UserContext} from "../../../hook/UserContext";
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
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const LoginV1 = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(UserContext);

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    console.log(router.query.token)
    if (router.query.token) {
      login("Bearer " + router.query.token).then(() => {
        router.replace("/")
      })
    }
  }, [router.query.token]);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onSubmit = async () => {
    try {
      let result = await Auth.login(email, values.password)

      if (typeof result === "object") {
        await login(result.jwt)
        router.replace("/")
      } else {
        setError("Something wrong happen...")
      }
    } catch (e) {
      console.log(e)
      setError("Something wrong happen...")
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                {`Welcome to ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            {(error.length !== 0) ?
              <Alert variant='filled' severity='error' sx={{ mb: 3 }}>
                {error}
              </Alert> : null}
            <form noValidate autoComplete='off' onSubmit={e => {
              e.preventDefault()
              onSubmit()
            }}>
              <CustomTextField
                autoFocus
                fullWidth
                id='email'
                label='Email'
                sx={{ mb: 4 }}
                placeholder='john.doe@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomTextField
                fullWidth
                sx={{ mb: 1.5 }}
                label='Password'
                value={values.password}
                id='auth-login-password'
                placeholder='············'
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
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel control={<Checkbox />} label='Remember Me' />
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                <Typography component={LinkStyled} href='/auth/register'>
                  Create an account
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
LoginV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginV1.needAuth = false

export default LoginV1
