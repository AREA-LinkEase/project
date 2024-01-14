import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import InputAdornment from "@mui/material/InputAdornment";
import {Icon} from "@iconify/react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {styled} from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../hook/UserContext";
import {Workspace} from "../../models/Workspaces";
import toast from "react-hot-toast";
import NetworkConfig from "../../configs/networkConfig";

const CustomTextFieldStyled = styled(CustomTextField)(({ theme }) => ({
    '& .MuiInputBase-root.MuiFilledInput-root': {
        width: '100%',
        backgroundColor: `${theme.palette.background.paper} !important`
    },
    [theme.breakpoints.up('sm')]: {
        width: '55%'
    }
}))

export default function workspaces() {
    const { token } = useContext(UserContext);
    const [workspaces, setWorkspaces] = useState([])

    useEffect(() => {
      (async () => {
        let result = await Workspace.getAll(token);

        if (typeof result !== "number") {
          setWorkspaces(result)
        }
      })()
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent sx={{ pt: 24, textAlign: 'center', pb: theme => `${theme.spacing(24)} !important` }}>
                        <Typography sx={{ mb: 4, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                            Search Workspaces in our community !
                        </Typography>

                        <CustomTextFieldStyled
                            size='medium'
                            placeholder='Search a workspace....'
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
                                  let result = await Workspace.getAll(token);

                                  if (typeof result !== "number") {
                                    setWorkspaces(result)
                                  }
                                } else {
                                  let result = await Workspace.search(token, input);

                                  if (typeof result !== "number") {
                                    setWorkspaces(result)
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
              {workspaces.map((workspace, i) => {
                console.log(workspace.users_id)
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card key={i}>
                      <CardHeader
                        title={
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                            <Icon fontSize={20} icon='tabler:command' />
                            <Typography fontSize={20}>{workspace.title}</Typography>
                          </Box>
                        }
                        subheader={workspace.description}
                        action={
                          <Fab size="small" color='info' aria-label='edit' href={"/workspaces/" + workspace.id}>
                            <Icon width={20} icon='tabler:chevron-right'/>
                          </Fab>
                        }
                      />
                      <CardContent>
                        <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <AvatarGroup className='pull-up' max={4}>
                            <Avatar src={NetworkConfig.url + "/assets/avatars/" + workspace.owner_id + ".png"} />
                            {workspace.users_id.map((user, i) => {
                              return <Avatar key={i} src={NetworkConfig.url + "/assets/avatars/" + user.id + ".png"} />
                            })}
                          </AvatarGroup>
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.25 } }}>
                            <Icon icon='tabler:eye' />
                            <Typography>{workspace.views}</Typography>
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
