import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {styled, useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useContext, useState} from "react";
import Fade from "@mui/material/Fade";
import Icon from "../../@core/components/icon";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import NetworkConfig from "../../configs/networkConfig";
import {useRouter} from "next/router";
import {Users} from "../../models/Users";
import {UserContext} from "../../hook/UserContext";

const defaultColumns = [
    {
        flex: 0.2,
        field: 'user',
        minWidth: 135,
        headerName: 'User',
        renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={NetworkConfig.url + "/assets/avatars/" + row.id + ".png"} alt={row.username} sx={{ mr: 4, width: 30, height: 30 }} />
            <Typography sx={{ color: 'text.secondary' }}>{row.username}</Typography>
        </Box>
    }
]

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

const UserTable = ({data, service}) => {
    const [value, setValue] = useState('')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })
    const [showAdd, setShowAdd] = useState(false)
    const theme = useTheme()
    const router = useRouter()
    const [searchResult, setSearchResult] = useState([]);
    const { token } = useContext(UserContext);

    const columns = [
        ...defaultColumns,
        {
            flex: 0.1,
            minWidth: 130,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title='Delete'>
                        <IconButton size='small' onClick={async () => {
                          let result = await service.removeUser(row.id)

                          if (result === true) {
                            toast.success("The user has deleted successfully")
                            router.reload()
                          } else {
                            console.log(result)
                            toast.error("An error has occurred")
                          }
                        }}>
                            <Icon icon='tabler:trash' />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ]

    return (
        <Card>
            <CardContent
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} onClick={() => setShowAdd(true)}>
                    Add New User
                </Button>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField value={value} placeholder='Search User' onChange={e => setValue(e.target.value)} />
                </Box>
            </CardContent>
            <DataGrid
                autoHeight
                rowHeight={54}
                rows={data}
                columns={columns}
                disableRowSelectionOnClick
                paginationModel={paginationModel}
                pageSizeOptions={[6, 10, 25, 50]}
                onPaginationModelChange={setPaginationModel}
            />
            <Dialog
                fullWidth
                open={showAdd}
                maxWidth='md'
                scroll='body'
                onClose={() => setShowAdd(false)}
                TransitionComponent={Transition}
                onBackdropClick={() => setShowAdd(false)}
                sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
            >
                <DialogContent
                    sx={{
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <CustomCloseButton onClick={() => setShowAdd(false)}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                    </CustomCloseButton>
                    <Box sx={{ mb: 8, textAlign: 'center' }}>
                        <Typography variant='h3' sx={{ mb: 3 }}>
                            Add New User
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Add new user to the service</Typography>
                    </Box>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <CustomTextField
                        sx={{ mb: 6 }}
                        fullWidth
                        label='Search User'
                        placeholder=''
                        onChange={async (e) => {
                          let result = await Users.searchUser(token, e.target.value);

                          if (e.target.value === "") return;
                          if (typeof result === "number") {
                            toast.error("An error has occurred")
                            console.log(result)
                          } else {
                            setSearchResult(result)
                          }
                        }}
                      />
                      <Typography variant='h4'>{`${searchResult.length} Members`}</Typography>
                      <List
                        dense
                        sx={{
                          mb: 3,
                          '& .MuiListItemText-primary': {
                            ...theme.typography.body1,
                            fontWeight: 500,
                            color: 'text.secondary'
                          },
                          '& .MuiListItemText-secondary': {
                            ...theme.typography.body1,
                            fontWeight: 500,
                            color: 'text.disabled'
                          }
                        }}
                      >
                        {searchResult.map(member => {
                          return (
                            <ListItem key={member.username} sx={{ px: 0, py: 2, display: 'flex', flexWrap: 'wrap' }}>
                              <ListItemAvatar>
                                <Avatar src={`${NetworkConfig.url}/assets/avatars/${member.id}.png`} alt={member.username} sx={{ height: 38, width: 38 }} />
                              </ListItemAvatar>
                              <ListItemText sx={{ m: 0 }} primary={member.username} secondary={member.email} />
                              <ListItemSecondaryAction sx={{ right: 0 }}>
                                <Button variant='contained' onClick={async () => {
                                  setShowAdd(false)
                                  let result = await service.addUser(member.id);

                                  if (typeof result === "number") {
                                    toast.error('An error has occurred')
                                    console.log(result)
                                  } else {
                                    toast.success('User Added !')
                                    router.reload();
                                  }
                                }}>Add</Button>
                              </ListItemSecondaryAction>
                            </ListItem>
                          )
                        })}
                      </List>
                    </Grid>
                  </Grid>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default UserTable
