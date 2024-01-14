import {useRouter} from "next/router";
import PageHeader from "../../@core/components/page-header";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";
import Card from "@mui/material/Card";
import AutomateTable from "../../views/workspaces/workspace/AutomateTable";
import UserTable from "../../views/workspaces/workspace/UserTable";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {forwardRef, useContext, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import CustomTextField from "../../@core/components/mui/text-field";
import Checkbox from "@mui/material/Checkbox";
import {UserContext} from "../../hook/UserContext";
import Spinner from "../../@core/components/spinner";
import {Workspace} from "../../models/Workspaces";
import {Users} from "../../models/Users";
import toast from "react-hot-toast";

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const workspace = () => {
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [info, setInfo] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const { token } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [isCheck, setCheck] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let newId = parseInt(router.query.id);

        if (Number.isNaN(newId)) return router.replace("/404");

        let newWorkspace = new Workspace(token, newId);

        let result = await newWorkspace.get();

        console.log(result)
        if (typeof result === "number")
          return

        let users = [];
        for (const user of result.users_id) {
          let userInfo = await Users.getUserById(token, user.id);

          if (typeof userInfo === "number") continue;
          users.push({...userInfo, permission: user.permission})
        }
        console.log(result)
        setWorkspace(newWorkspace)
        setInfo({...result, users})
        setTitle(result.title)
        setDescription(result.description)
        setCheck(result.is_private)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })()
  }, []);

  if (isLoading)
    return <Spinner />

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
        <Button variant='contained' onClick={() => setShowEdit(true)}>Edit Workspace</Button>
      </Grid>
      <Grid item container xs={12} spacing={6}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>Automates</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{info.automates.length}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  Total
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color='primary' sx={{ width: 38, height: 38 }}>
                <Icon icon="tabler:toggle-left" fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>Users</Typography>
                <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h4'>{info.users.length}</Typography>
                </Box>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  Total
                </Typography>
              </Box>
              <CustomAvatar skin='light' variant='rounded' color='warning' sx={{ width: 38, height: 38 }}>
                <Icon icon="tabler:user" fontSize={24} />
              </CustomAvatar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AutomateTable data={info.automates} workspace={workspace} token={token} />
      </Grid>
      <Grid item xs={12}>
        <UserTable data={info.users} workspace={workspace} />
      </Grid>
    </Grid>
    <Dialog
      fullWidth
      open={showEdit}
      maxWidth='md'
      scroll='body'
      onClose={() => setShowEdit(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShowEdit(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={() => setShowEdit(false)}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h3' sx={{ mb: 3 }}>
            Edit Workspace
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{info.title}'s edition</Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTextField
              sx={{ mb: 6 }}
              fullWidth
              label='Name'
              placeholder=''
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              rows={4}
              multiline
              fullWidth
              label='Description'
              id='textarea-outlined-static'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel label='Need to be private ?' control={<Checkbox
              defaultChecked
              name='basic-checked'
              checked={isCheck}
              onChange={(e) => setCheck(e.target.checked)}
            />} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 1 }} onClick={async () => {
          setShowEdit(false)
          let result = await workspace.edit({
            title,
            description,
            is_private: isCheck
          })

          if (typeof result === "number")
            toast.error("An error has occurred")
          else {
            router.reload();
            toast.success("The workspace has edited successfully")
          }
        }}>
          Update
        </Button>
        <Button variant='tonal' color='secondary' onClick={() => setShowEdit(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

export default workspace
