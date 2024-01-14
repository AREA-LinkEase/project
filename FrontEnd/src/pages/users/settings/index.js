import {useContext, useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Icon from "../../../@core/components/icon";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CustomTextField from "../../../@core/components/mui/text-field";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";
import FriendsTable from "../../../views/users/FriendsTable";
import Link from "next/link";
import {UserContext} from "../../../hook/UserContext";
import {Users} from "../../../models/Users";
import Spinner from "../../../@core/components/spinner";
import {useRouter} from "next/router";
import NetworkConfig from "../../../configs/networkConfig";
import {Service} from "../../../models/Services";

const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

function Account({info, user}) {
    const [inputValue, setInputValue] = useState('')
    const [imgSrc, setImgSrc] = useState(NetworkConfig.url + "/assets/avatars/" + info.id + ".png")

    const [username, setUsername] = useState(info.username)
    const [email, setEmail] = useState(info.email)
    const [avatar, setAvatar] = useState(null)

    const router = useRouter()

    const handleInputImageChange = (file) => {
      const reader = new FileReader()
      const { files } = file.target
      setAvatar(file.target.files[0])
      if (files && files.length !== 0) {
        reader.onload = () => setImgSrc(reader.result)
        reader.readAsDataURL(files[0])

        if (reader.result !== null) {
          setInputValue(reader.result)
        }
      }
    }
    const handleInputImageReset = () => {
      setInputValue('')
      setAvatar(null)
      setImgSrc(NetworkConfig.url + "/assets/avatars/" + info.id + ".png")
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Profile Details' />
                        <form>
                            <CardContent sx={{ pt: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ImgStyled src={imgSrc} alt='Avatar' />
                                    <div>
                                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                            Upload New Photo
                                            <input
                                                hidden
                                                type='file'
                                                value={inputValue}
                                                accept='image/png, image/jpeg'
                                                onChange={handleInputImageChange}
                                                id='account-settings-upload-image'
                                            />
                                        </ButtonStyled>
                                        <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                                          Reset
                                        </ResetButtonStyled>
                                        <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                                    </div>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label='Username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label='email'
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                                        <Button variant='contained' sx={{ mr: 4 }} onClick={async () => {
                                          try {
                                            if (avatar !== null) {
                                              const formData = new FormData();

                                              console.log(avatar)
                                              formData.append("avatar", avatar)

                                              await user.updateAvatar(formData)
                                            }
                                            let result = await user.update({
                                              username,
                                              email
                                            })

                                            if (typeof result === "number") {
                                              toast.error("An error has occurred")
                                              console.log(result)
                                            } else {
                                              toast.success("Your profile has been updated successfully")
                                              router.reload()
                                            }
                                          } catch (e) {
                                            console.log(e)
                                          }
                                        }}>
                                            Save Changes
                                        </Button>
                                        <Button type='reset' variant='tonal' color='secondary'>
                                            Reset
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

const defaultValues = {
    newPassword: '',
    confirmNewPassword: ''
}

const schema = yup.object().shape({
    newPassword: yup
        .string()
        .min(8)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
        )
        .required(),
    confirmNewPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

function Security({user, info}) {
    const [values, setValues] = useState({
        showNewPassword: false,
        showConfirmNewPassword: false
    })

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues, resolver: yupResolver(schema) })

    const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword })
    }

    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
    }

    const onPasswordFormSubmit = async (value) => {
        await user.update({
          password: value.newPassword
        })
        toast.success('Password Changed Successfully')
        reset(defaultValues)
    }
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Change Password' />
                    <CardContent>
                        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
                            <Grid container spacing={5} sx={{ mt: 0 }}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='newPassword'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                label='New Password'
                                                id='input-new-password'
                                                placeholder='············'
                                                error={Boolean(errors.newPassword)}
                                                type={values.showNewPassword ? 'text' : 'password'}
                                                {...(errors.newPassword && { helperText: errors.newPassword.message })}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                edge='end'
                                                                onClick={handleClickShowNewPassword}
                                                                onMouseDown={e => e.preventDefault()}
                                                            >
                                                                <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='confirmNewPassword'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                placeholder='············'
                                                label='Confirm New Password'
                                                id='input-confirm-new-password'
                                                error={Boolean(errors.confirmNewPassword)}
                                                type={values.showConfirmNewPassword ? 'text' : 'password'}
                                                {...(errors.confirmNewPassword && { helperText: errors.confirmNewPassword.message })}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                edge='end'
                                                                onMouseDown={e => e.preventDefault()}
                                                                onClick={handleClickShowConfirmNewPassword}
                                                            >
                                                                <Icon
                                                                    fontSize='1.25rem'
                                                                    icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                                                />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>Password Requirements:</Typography>
                                    <Box component='ul' sx={{ pl: 6, mb: 0, '& li': { mb: 1.5, color: 'text.secondary' } }}>
                                        <li>Minimum 8 characters long - the more, the better</li>
                                        <li>At least one lowercase & one uppercase character</li>
                                        <li>At least one number, symbol, or whitespace character</li>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                                        Save Changes
                                    </Button>
                                    <Button type='reset' variant='tonal' color='secondary' onClick={() => reset()}>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

function Friends({user, token}) {
    const [data, setData] = useState([])

    useEffect(() => {
      (async () => {
        try {
          let result = await user.getFriends();

          if (typeof result === "number")
            return
          setData(result)
        } catch (e) {
          console.log(e)
        }
      })()
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FriendsTable data={data} user={user} token={token} />
            </Grid>
        </Grid>
    )
}

function Connections({info, token}) {
    const [data, setData] = useState([])

    useEffect(() => {
      (async () => {
        let result = [];

        for (const name of Object.keys(info.services)) {
          let services = await Service.search(token, name);

          if (typeof services === "number" || services.length === 0) continue;

          let service = services[0];

          result.push(service)
        }
        setData(result)
      })()
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title='Services Connections'
                            titleTypographyProps={{ sx: { mb: 1 } }}
                            subheader={
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Linked account used by your automates
                                </Typography>
                            }
                            action={
                                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} href={"/community/services"}>
                                    Add More Services
                                </Button>
                            }
                        />
                        <CardContent>
                            {data.map(account => {
                                return (
                                    <Box
                                        key={account.name}
                                        sx={{
                                            gap: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            '&:not(:last-of-type)': { mb: 4 }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                                                <img src={NetworkConfig.url + "/assets/services/" + account.id + ".png"} alt={account.name} height='38' />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='h6'>{account.name}</Typography>
                                                <Typography
                                                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                                                >
                                                  Connected
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button
                                            variant='tonal'
                                            sx={{ p: 1.5, minWidth: 38 }}
                                            color='secondary'
                                            href={"/services/" + account.id}
                                        >
                                            <Icon icon='tabler:link' />
                                        </Button>
                                    </Box>
                                )
                            })}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default function index() {
    const [activeTab, setActiveTab] = useState("account")

    const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

    const [info, setInfo] = useState(null);
    const { token, user } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        try {
          let result = await user.get();

          if (typeof result === "number")
            return
          setInfo(result)
          setLoading(false)
        } catch (e) {
          console.log(e)
        }
      })()
    }, []);

    if (isLoading)
      return <Spinner />

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    const tabContentList = {
        account: <Account info={info} user={user} token={token} />,
        security: <Security info={info} user={user} token={token} />,
        friends: <Friends info={info} user={user} token={token} />,
        connections: <Connections info={info} user={user} token={token} />
    }

    return <>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TabContext value={activeTab}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <TabList
                                variant='scrollable'
                                scrollButtons='auto'
                                onChange={handleChange}
                                aria-label='customized tabs example'
                            >
                                <Tab
                                    value='account'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:user' />
                                            {!hideText && 'Account'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='security'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:lock' />
                                            {!hideText && 'Security'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value="friends"
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:users' />
                                            {!hideText && 'Friends'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='connections'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:link' />
                                            {!hideText && 'Connections'}
                                        </Box>
                                    }
                                />
                            </TabList>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel sx={{ p: 0 }} value={activeTab}>
                                {tabContentList[activeTab]}
                            </TabPanel>
                        </Grid>
                    </Grid>
                </TabContext>
            </Grid>
        </Grid>
    </>
}
