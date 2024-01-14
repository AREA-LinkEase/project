import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useContext, useEffect, useState} from "react";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import toast from "react-hot-toast";
import {Workspace} from "../../models/Workspaces";
import {UserContext} from "../../hook/UserContext";
import {useRouter} from "next/router";

const defaultColumns = [
    {
        flex: 0.2,
        field: 'title',
        minWidth: 90,
        headerName: 'Title',
        renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
    },
    {
        flex: 0.15,
        minWidth: 80,
        field: 'value',
        headerName: 'Value',
        renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.content}</Typography>
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

const VariableTable = ({automate}) => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })
    const [data, setData] = useState([])
    const [workspace, setWorkspace] = useState(null)
    const { token } = useContext(UserContext);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");

    const router = useRouter()

    useEffect(() => {
      (async () => {
        try {
          const newWorkspace = new Workspace(token, automate.workspace_id)

          const result = await newWorkspace.get()

          let results = [];
          for (const [i, name] of Object.keys(result.variables).entries()) {
            results.push(
              {
                title: name,
                content: automate.variables[name],
                id: i
              }
            )
          }
          setData(results)
          setWorkspace(newWorkspace)
          console.log(results, result)
        } catch (e) {
          console.log(e)
          toast.error("An error has occurred")
        }
      })()
    }, []);

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
                    <Tooltip title='Delete Automate'>
                        <IconButton size='small' onClick={async () => {
                          await workspace.removeVariable(row.title)
                          router.reload()
                          toast.success("Variable has deleted successfully")
                        }}>
                            <Icon icon='tabler:trash' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit'>
                        <IconButton size='small' onClick={() => {
                          setShow(true)
                          setTitle(row.title)
                          setDescription(row.content)
                        }}>
                            <Icon icon='tabler:pencil' />
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
                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} onClick={() => {
                  setShow(true)
                  setTitle("")
                  setDescription("")
                }}>
                    Create Variable
                </Button>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField value={value} placeholder='Search Variable' onChange={e => setValue(e.target.value)} />
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
                          {(title.length === 0) ? "Create New Variable" : "Edit Variable"}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Explication d'une variable</Typography>
                    </Box>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='Title'
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
                                label='Value'
                                id='textarea-outlined-static'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                      let result = await workspace.addVariable(title, description)

                      if (typeof result === "number")
                        toast.error("An error has occurred")
                      else {
                        router.reload();
                        toast.success("The variable has added successfully")
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

export default VariableTable
