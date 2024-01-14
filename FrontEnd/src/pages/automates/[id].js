import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import PageHeader from "../../@core/components/page-header";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {useContext, useEffect, useState} from "react";
import Logs from "../../views/automates/tabs/Logs";
import Variables from "../../views/automates/tabs/Variables";
import Workflow from "../../views/automates/tabs/Workflow";
import Settings from "../../views/automates/tabs/Settings";
import TabList from "@mui/lab/TabList";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Workspace} from "../../models/Workspaces";
import {Users} from "../../models/Users";
import Spinner from "../../@core/components/spinner";
import {UserContext} from "../../hook/UserContext";
import {Automate} from "../../models/Automates";

const automate = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("workflow")
  const [info, setInfo] = useState(null);
  const [automate, setAutomate] = useState(null);
  const { token } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

  useEffect(() => {
    (async () => {
      try {
        let newId = parseInt(router.query.id);

        if (Number.isNaN(newId)) return router.replace("/404");

        let newAutomate = new Automate(token, newId);

        let result = await newAutomate.get();

        if (typeof result === "number")
          return
        setAutomate(newAutomate)
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
        logs: <Logs info={info} automate={automate} />,
        settings: <Settings info={info} automate={automate} />,
        variables: <Variables info={info} automate={automate} />,
        workflow: <Workflow info={info} automate={automate} token={token} />
    }

  return <>
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            {info.title}
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            {info.description}
          </Typography>
        }
      />
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
                              value='workflow'
                              label={
                                  <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                      <Icon fontSize='1.25rem' icon='tabler:shape' />
                                      {!hideText && 'Workflow'}
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
                              value='variables'
                              label={
                                  <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                      <Icon fontSize='1.25rem' icon='tabler:variable' />
                                      {!hideText && 'Variables'}
                                  </Box>
                              }
                          />
                          <Tab
                              value='logs'
                              label={
                                  <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                      <Icon fontSize='1.25rem' icon='tabler:file-text' />
                                      {!hideText && 'Logs'}
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

export default automate
