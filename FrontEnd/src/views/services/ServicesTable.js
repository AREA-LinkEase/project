import Box from "@mui/material/Box";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import CustomChip from "../../@core/components/mui/chip";
import {forwardRef, Fragment, useContext, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import OptionsMenu from "../../@core/components/option-menu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {styled} from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import NetworkConfig from "../../configs/networkConfig";
import {useDropzone} from "react-dropzone";
import toast from "react-hot-toast";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import {Service} from "../../models/Services";
import {UserContext} from "../../hook/UserContext";
import {useRouter} from "next/router";

const defaultColumns = [
    {
        flex: 0.2,
        field: 'id',
        minWidth: 90,
        headerName: 'Name',
        renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={NetworkConfig.url + "/assets/services/" + row.id + ".png"} alt={row.name} sx={{ mr: 4, width: 30, height: 30 }} />
            <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
        </Box>
    },
    {
        flex: 0.15,
        minWidth: 80,
        field: 'Owner',
        headerName: 'Owner',
        renderCell: ({ row }) => <>
            <Typography sx={{ color: 'text.secondary' }}>{row.owner.username}</Typography>
        </>
    },
    {
        flex: 0.3,
        minWidth: 125,
        field: 'Users',
        headerName: 'Users',
        renderCell: ({ row }) => <AvatarGroup className='pull-up' max={4}>
            {row.users.map((user, i) => {
                return <Avatar key={i} src={NetworkConfig.url + "/assets/avatars/" + user.id + ".png"} alt={user.username} />
            })}
        </AvatarGroup>
    },
    {
        flex: 0.25,
        minWidth: 90,
        field: 'Status',
        headerName: 'Status',
        renderCell: ({ row }) => <CustomChip rounded label={(row.is_private) ? "private" : "public"} skin='light' color={(row.is_private ? "secondary" : "warning")} />
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

const WorkspacesTable = ({data}) => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })
    const { token } = useContext(UserContext);
    const router = useRouter();
    const [form, setForm] = useState({
      'name': "",
      "description": "",
      "client_id": "",
      "client_secret": "",
      "scope": "",
      "auth_url": "",
      "token_url": "",
      "is_private": false
    })
    const [files, setFiles] = useState([])
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxFiles: 1,
      maxSize: 2000000,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
      },
      onDropRejected: () => {
        toast.error('You can only upload 1 file & maximum size of 2 MB.', {
          duration: 2000
        })
      }
    })

    const renderFilePreview = file => {
      if (file.type.startsWith('image')) {
        return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
      } else {
        return <Icon icon='tabler:file-description' />
      }
    }
    const handleRemoveFile = file => {
      const uploadedFiles = files
      const filtered = uploadedFiles.filter(i => i.name !== file.name)
      setFiles([...filtered])
    }

    const fileList = files.map(file => (
      <ListItem key={file.name}>
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? (Math.round(file.size / 100) / 10000).toFixed(1) + "mb"
                : (Math.round(file.size / 100) / 10).toFixed(1) + "kb"}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='tabler:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))

    const handleRemoveAllFiles = () => {
      setFiles([])
    }

    const fillInput = (key, value) => {
      form[key] = value;
      setForm({...form})
    }

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
                        <IconButton size='small' onClick={() => {}}>
                            <Icon icon='tabler:trash' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='View'>
                        <IconButton size='small' component={Link} href={"/services/" + row.id}>
                            <Icon icon='tabler:eye' />
                        </IconButton>
                    </Tooltip>
                    <OptionsMenu
                        iconButtonProps={{ size: 'small' }}
                        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                        options={[
                            {
                                text: (row.status === "enable") ? "disable" : "enable",
                                icon: <Icon icon={'tabler:' + ((row.status === "enable") ? "pause" : "play")} fontSize='1.25rem' />
                            },
                            {
                                text: 'Edit',
                                href: `/services/` + row.id,
                                icon: <Icon icon='tabler:pencil' fontSize='1.25rem' />
                            }
                        ]}
                    />
                </Box>
            )
        }
    ]

    return (
        <Card>
            <CardContent
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} onClick={() => setShow(true)}>
                    Create Services
                </Button>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField value={value} placeholder='Search Service' onChange={e => setValue(e.target.value)} />
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
                open={show}
                maxWidth='md'
                scroll='body'
                onClose={() => setShow(false)}
                TransitionComponent={Transition}
                onBackdropClick={() => setShow(false)}
                sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
            >
                <DialogContent
                    sx={{
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <CustomCloseButton onClick={() => setShow(false)}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                    </CustomCloseButton>
                    <Box sx={{ mb: 8, textAlign: 'center' }}>
                        <Typography variant='h3' sx={{ mb: 3 }}>
                            Create New Service
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Explication d'un service</Typography>
                    </Box>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='Name'
                              placeholder=''
                              value={form["name"]}
                              onChange={(e) => fillInput("name", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            rows={4}
                            multiline
                            fullWidth
                            label='Description'
                            id='textarea-outlined-static'
                            value={form["description"]}
                            onChange={(e) => fillInput("description", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='client_id'
                              placeholder=''
                              value={form["client_id"]}
                              onChange={(e) => fillInput("client_id", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='client_secret'
                              placeholder=''
                              value={form["client_secret"]}
                              onChange={(e) => fillInput("client_secret", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='scope'
                              placeholder=''
                              value={form["scope"]}
                              onChange={(e) => fillInput("scope", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='auth_url'
                              placeholder=''
                              value={form["auth_url"]}
                              onChange={(e) => fillInput("auth_url", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='token_url'
                              placeholder=''
                              value={form["token_url"]}
                              onChange={(e) => fillInput("token_url", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          <Fragment>
                            <div {...getRootProps({ className: 'dropzone' })}>
                              <input {...getInputProps()} />
                              <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Box
                                  sx={{
                                    mb: 8.75,
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    borderRadius: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                                  }}
                                >
                                  <Icon icon='tabler:upload' fontSize='1.75rem' />
                                </Box>
                                <Typography variant='h4' sx={{ mb: 2.5 }}>
                                  Drop the logo of your service.
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                  Allowed *.jpeg, *.jpg, *.png, *.gif
                                </Typography>
                              </Box>
                            </div>
                            {files.length ? (
                              <Fragment>
                                <List>{fileList}</List>
                                <div className='buttons'>
                                  <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                                    Remove File
                                  </Button>
                                </div>
                              </Fragment>
                            ) : null}
                          </Fragment>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                                control={<Switch
                                  checked={form["is_private"]}
                                  onChange={(e) => fillInput("is_private", e.target.checked)}
                                />}
                                label='this service need to be private ?'
                            />
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
                      setShow(false)
                      console.log(form, files)
                      try {
                        const formData = new FormData();

                        for (const key of Object.keys(form)) {
                          formData.append(key, form[key])
                        }
                        if (files.length > 0)
                          formData.append("image", files[0])
                        let result = await Service.createService(token, formData)

                        if (result === true) {
                          toast.success("Service has created successfully")
                          router.reload()
                        } else {
                          toast.error("An error has occurred")
                          console.log(result)
                        }
                      } catch (e) {
                        console.log(e)
                        toast.error("An error has occurred")
                      }
                    }}>
                        Submit
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default WorkspacesTable
