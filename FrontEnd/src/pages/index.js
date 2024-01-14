import Grid from "@mui/material/Grid";
import PageHeader from "../@core/components/page-header";
import Typography from "@mui/material/Typography";
import WorkspacesTable from "../views/workspaces/WorkspacesTable";
import DrawerCreator from "../views/workspaces/DrawerCreator";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../hook/UserContext";
import {Workspace} from "../models/Workspaces";
import toast from "react-hot-toast";
import {Users} from "../models/Users";
import {Service} from "../models/Services";
import ServicesTable from "../views/services/ServicesTable";

const Home = () => {
  const [isOpen, setOpen] = useState(false)
  const { token } = useContext(UserContext);
  const [workspaces, setWorkspaces] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    (async () => {
      try {
        let servicesData = await Service.getServices(token)

        if (typeof servicesData === "number") {
          toast.error('An error has occurred')
          console.log(servicesData)
        } else {
          let data = [];

          for (const service of servicesData) {
            let owner = await Users.getUserById(token, service.owner_id);
            let users = [];

            if (typeof owner === "number") continue;

            users.push(owner)
            for (const user_id of service.users_id) {
              let userInfo = await Users.getUserById(token, user_id);

              if (typeof userInfo === "number") continue;
              users.push(userInfo)
            }
            data.push({
              ...service,
              owner: owner,
              users: users
            })
          }
          console.log(data)
          setServices(data)
        }
      } catch (e) {
        console.log(e)
        toast.error('An error has occurred')
      }
    })()
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let workspacesData = await Workspace.getAllWorkspaces(token);

        if (typeof workspacesData === "number") {
          toast.error('An error has occurred')
          console.log(workspacesData)
        } else {
          let data = [];

          for (const workspace of workspacesData) {
            let owner = await Users.getUserById(token, workspace.owner_id);
            let users = [];

            if (typeof owner === "number") continue;

            users.push(owner)
            for (const user of workspace.users_id) {
              let userInfo = await Users.getUserById(token, user.id);

              if (typeof userInfo === "number") continue;
              users.push(userInfo)
            }
            data.push({
              ...workspace,
              owner: owner,
              users: users
            })
          }
          setWorkspaces(data)
        }
      } catch (e) {
        console.log(e)
        toast.error('An error has occurred')
      }
    })()
  }, []);

  const handleDrawer = () => setOpen(!isOpen)

  return <>
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            Workspaces
          </Typography>
        }
      />
      <Grid item xs={12}>
        <WorkspacesTable data={workspaces} handleDrawer={handleDrawer} />
      </Grid>
      <PageHeader
        title={
          <Typography variant='h4'>
            Services
          </Typography>
        }
      />
      <Grid item xs={12}>
        <ServicesTable data={services} />
      </Grid>
    </Grid>
    <DrawerCreator isOpen={isOpen} handleDrawer={handleDrawer} />
  </>
}

export default Home
