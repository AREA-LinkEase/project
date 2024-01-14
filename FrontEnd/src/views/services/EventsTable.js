import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CustomChip from "../../@core/components/mui/chip";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useEffect, useState} from "react";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Icon from "../../@core/components/icon";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import {useRouter} from "next/router";
import toast from "react-hot-toast";

const defaultColumns = [
    {
        flex: 0.2,
        field: 'id',
        minWidth: 90,
        headerName: 'Name',
        renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
        </Box>
    },
    {
        flex: 0.25,
        minWidth: 90,
        field: 'Type',
        headerName: 'Type',
        renderCell: ({ row }) => <CustomChip rounded label={row.type} skin='light' color="info" />
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

const EventsTable = ({defaultSelect, id, data, service}) => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })

    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [type, setType] = useState(defaultSelect);

    useEffect(() => {
      setType(defaultSelect)
    }, [defaultSelect]);

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
                    <Tooltip title='View'>
                        <IconButton size='small' component={Link} href={"/events/" + id + "/" + row.id}>
                            <Icon icon='tabler:eye' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton size='small' onClick={async () => {
                          await service.deleteEvent(row.id)
                          router.reload();
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
                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} onClick={() => setShow(true)}>
                    Create {defaultSelect}
                </Button>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField value={value} placeholder='Search ...' onChange={e => setValue(e.target.value)} />
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
                            Create New Event
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Explication d'un event</Typography>
                    </Box>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              select
                              defaultValue={defaultSelect} SelectProps={{type, onChange: (e) => setType(e.target.value)}}
                              label='Default'
                              id='custom-select'>
                                <MenuItem value="action">Action</MenuItem>
                                <MenuItem value="trigger">Trigger</MenuItem>
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='name'
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
                      try {
                        let result = await service.createEvent({
                          name: title,
                          description,
                          type
                        })

                        if (typeof result === "number") {
                          toast.error("An error has occurred")
                          console.log(result)
                        } else {
                          toast.success("An event has created successfully")
                          router.reload();
                        }
                      } catch (e) {
                        console.log(e)
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

export default EventsTable
