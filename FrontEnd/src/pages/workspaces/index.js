import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageHeader from "../../@core/components/page-header";
import WorkspacesTable from "../../views/workspaces/WorkspacesTable";
import {useContext, useEffect, useState} from "react";
import DrawerCreator from "../../views/workspaces/DrawerCreator";
import {UserContext} from "../../hook/UserContext";
import {Workspace} from "../../models/Workspaces";
import toast from "react-hot-toast";
import {Users} from "../../models/Users";

const Workspaces = () => {
  const [isOpen, setOpen] = useState(false)
  const { token } = useContext(UserContext);
  const [workspaces, setWorkspaces] = useState([])

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

  return (
    <>
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant='h4'>
              Workspaces
            </Typography>
          }
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Unlock collaboration and efficiency with Workspaces. Organize your projects, share ideas, and boost productivity on our Workspaces page.
            </Typography>
          }
        />
        <Grid item xs={12}>
          <WorkspacesTable data={workspaces} handleDrawer={handleDrawer} token={token} />
        </Grid>
      </Grid>
      <DrawerCreator isOpen={isOpen} handleDrawer={handleDrawer} />
    </>
  )
}

export default Workspaces
