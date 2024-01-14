import Link from "next/link";
import Icon from "../../../@core/components/icon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../../@core/components/mui/avatar";
import {forwardRef, useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OptionsMenu from "../../../@core/components/option-menu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import CustomChip from 'src/@core/components/mui/chip'
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Fade from "@mui/material/Fade";
import {styled} from "@mui/material/styles";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {Automate} from "../../../models/Automates";

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: 'Title',
    renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CustomAvatar skin='light' color='primary' sx={{ mr: 4, width: 30, height: 30 }}>
        <Icon icon='tabler:toggle-left' fontSize={20}/>
      </CustomAvatar>
      <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
    </Box>
  },
  {
    flex: 0.15,
    minWidth: 80,
    field: 'visibility',
    headerName: 'Visibility',
    renderCell: ({ row }) => <>
      <CustomChip rounded label={(row.is_private) ? "private" : "public"} skin='light' color={(row.is_private ? "warning" : "secondary")} />
    </>
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'Status',
    headerName: 'Status',
    renderCell: ({ row }) => <CustomChip rounded label={(row.is_enabled) ? "enable" : "disable"} skin='light' color={(row.is_enabled ? "success" : "error")} />
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

const AutomateTable = ({data, workspace, token}) => {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [isCheck, setCheck] = useState(false);

  const router = useRouter()

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
            <IconButton size='small' onClick={() => {}}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={"/automates/" + row.id}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: (row.is_enabled) ? "disable" : "enable",
                menuItemProps: {
                  onClick: async () => {
                    const automate = new Automate(token, row.id)
                    await automate.edit({is_enabled: !row.is_enabled})
                    router.reload();
                  },
                },
                icon: <Icon icon={'tabler:' + ((row.is_enabled) ? "pause" : "play")} fontSize='1.25rem' />
              },
              {
                text: 'Edit',
                href: `/automates/` + row.id,
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
          Create Automate
        </Button>
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomTextField value={value} placeholder='Search Automate' onChange={e => setValue(e.target.value)} />
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
              Create new Automate
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Explication d'un automate</Typography>
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
                label='Description'
                id='textarea-outlined-static'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
                control={<Switch
                  defaultChecked
                  checked={isCheck}
                  onChange={(e) => setCheck(e.target.checked)}
                />}
                label='this automate need to be private ?'
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
            let result = await workspace.createAutomate({
              title,
              description,
              is_private: isCheck
            })

            if (typeof result === "number") {
              toast.error("An error has occurred")
              console.log(result)
            } else {
              toast.success("An automate has created successfully")
              router.reload()
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

export default AutomateTable
