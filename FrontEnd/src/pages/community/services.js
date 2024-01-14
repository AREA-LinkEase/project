import {styled} from "@mui/material/styles";
import CustomTextField from "../../@core/components/mui/text-field";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import {Icon} from "@iconify/react";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../hook/UserContext";
import toast from "react-hot-toast";
import {Service} from "../../models/Services";
import NetworkConfig from "../../configs/networkConfig";
import Link from "next/link";

const CustomTextFieldStyled = styled(CustomTextField)(({ theme }) => ({
    '& .MuiInputBase-root.MuiFilledInput-root': {
        width: '100%',
        backgroundColor: `${theme.palette.background.paper} !important`
    },
    [theme.breakpoints.up('sm')]: {
        width: '55%'
    }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: 20
}))

export default function automates() {
    const { token } = useContext(UserContext);
    const [services, setServices] = useState([])

    useEffect(() => {
      (async () => {
        let result = await Service.getAll(token);

        if (typeof result !== "number") {
          setServices(result)
        }
      })()
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent sx={{ pt: 24, textAlign: 'center', pb: theme => `${theme.spacing(24)} !important` }}>
                        <Typography sx={{ mb: 4, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                            Search Services in our community !
                        </Typography>

                        <CustomTextFieldStyled
                            size='medium'
                            placeholder='Search a service....'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Icon fontSize='1.25rem' icon='tabler:search' />
                                    </InputAdornment>
                                )
                            }}
                            onChange={async (e) => {
                              let input = e.target.value;

                              try {
                                if (input === "") {
                                  let result = await Service.getAll(token);

                                  if (typeof result !== "number") {
                                    setServices(result)
                                  }
                                } else {
                                  let result = await Service.search(token, input);

                                  if (typeof result !== "number") {
                                    setServices(result)
                                  }
                                }
                              } catch (e) {
                                console.log(e)
                                toast.error("An error has occurred")
                              }
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
              {services.map((service, i) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card key={i}>
                      <CardHeader
                        title={
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                            <Icon fontSize={20} icon='tabler:link' />
                            <LinkStyled fontSize={20} href={"/services/" + service.id}>{service.name}</LinkStyled>
                          </Box>
                        }
                        action={
                          <Avatar
                            variant='rounded'
                            src={NetworkConfig.url + "/assets/services/" + service.id + ".png"}
                            sx={{
                              width: 55,
                              height: 55,
                            }}
                          />
                        }
                      />
                      <CardContent>
                        <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <AvatarGroup className='pull-up' max={4}>
                            <Avatar src={NetworkConfig.url + "/assets/avatars/" + service.owner_id + ".png"} />
                            {service.users_id.map((user_id, i) => {
                              <Avatar key={i} src={NetworkConfig.url + "/assets/avatars/" + user_id + ".png"} />
                            })}
                          </AvatarGroup>
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.25 } }}>
                            <Icon icon='tabler:eye' />
                            <Typography>{services.views}</Typography>
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
        </Grid>
    )
}
