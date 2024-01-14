import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Settings from "../../views/services/tabs/Settings";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import TabPanel from "@mui/lab/TabPanel";
import Events from "../../views/services/tabs/Events";
import UsersComponent from "../../views/services/tabs/Users";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CustomAvatar from "../../@core/components/mui/avatar";
import Button from "@mui/material/Button";
import {UserContext} from "../../hook/UserContext";
import Spinner from "../../@core/components/spinner";
import {Service} from "../../models/Services";
import NetworkConfig from "../../configs/networkConfig";
import {Users} from "../../models/Users";

export default function service() {
    const router = useRouter();
    const [info, setInfo] = useState(null);
    const [service, setService] = useState(null);
    const { token, user } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [isConnected, setConnected] = useState(false);

    const [activeTab, setActiveTab] = useState("triggers")

    const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    useEffect(() => {
      (async () => {
        try {
          let newId = parseInt(router.query.id);

          if (Number.isNaN(newId)) return router.replace("/404");

          let newService = new Service(token, newId);

          let result = await newService.get();

          console.log(result)
          if (typeof result === "number")
            return

          let users = [];
          for (const user_id of result.users_id) {
            let userInfo = await Users.getUserById(token, user_id);

            if (typeof userInfo === "number") continue;
            users.push({...userInfo})
          }
          console.log(result)
          setService(newService)
          setInfo({...result, users})
          setLoading(false)

          let userInfo = await user.get();

          if (result.name in userInfo.services)
            setConnected(true)
        } catch (e) {
          console.log(e)
        }
      })()
    }, []);

    if (isLoading)
      return <Spinner />

    const tabContentList = {
        triggers: <Events info={info} service={service} type="trigger" />,
        actions: <Events info={info} service={service} type="action" />,
        settings: <Settings info={info} service={service} />,
        users: <UsersComponent info={info} service={service} />
    }


    return <>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-end', padding: 5, justifyContent: 'space-between' }}>
                        <Grid item xs={12} sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <CustomAvatar
                                variant='rounded'
                                src={NetworkConfig.url + "/assets/services/" + info.id + ".png"}
                                sx={{ width: 100, height: 100, mr: 6 }}
                            />
                            <Grid item xs={12} >
                              <Typography variant='h4' sx={{ mb: 2 }}>{info.name}</Typography>
                              <Typography sx={{ mb: 2, color: 'text.secondary' }}>{info.description}</Typography>
                            </Grid>
                        </Grid>
                        <Button variant='contained' sx={{ '& svg': { mr: 1 } }} color={(isConnected) ? "success" : "primary"}
                          startIcon={(isConnected) ? <Icon icon='tabler:check' /> : <Icon icon='tabler:link' />}
                          href={NetworkConfig.url + "/service/connect/" + info.id + "/" + token.split(" ")[1]}
                          target="_blank"
                        >
                          {(isConnected) ? "Connected" : "Connect"}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
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
                                    value='triggers'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:urgent' />
                                            {!hideText && 'Triggers'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='actions'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:sort-ascending' />
                                            {!hideText && 'Actions'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='settings'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:settings' />
                                            {!hideText && 'Settings'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='users'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <Icon fontSize='1.25rem' icon='tabler:file-text' />
                                            {!hideText && 'Users'}
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
