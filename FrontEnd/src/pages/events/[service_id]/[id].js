import {useRouter} from "next/router";
import {forwardRef, useContext, useEffect, useState} from "react";
import PageHeader from "../../../@core/components/page-header";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Icon from "../../../@core/components/icon";
import Box from "@mui/material/Box";
import CustomTextField from "../../../@core/components/mui/text-field";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Spinner from "../../../@core/components/spinner";
import {UserContext} from "../../../hook/UserContext";
import {Service} from "../../../models/Services";
import toast from "react-hot-toast";
import WorkflowComponent from "../../../views/workflow/Workflow";
import {HandleTypes} from "../../../views/workflow/Nodes/nodes";

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

export default function event() {
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false)
    const [info, setInfo] = useState(null);
    const [service, setService] = useState(null);
    const { token } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [nodes, setNodes] = useState({});

    const onChange = async (workflow) => {
      try {
        let result = await service.editEvent(info.id, {
          workflow
        })

        if (typeof result === "number") {
          toast.error("An error has occurred")
          console.log(result)
        } else {
          toast.success("The workflow has been updated successfully")
          router.reload()
        }
      } catch (e) {
        console.log(e)
        toast.error("An error has occurred")
      }
    }

    useEffect(() => {
      (async () => {
        try {
          let newId = parseInt(router.query.id);
          let serviceId = parseInt(router.query.service_id)

          if (Number.isNaN(newId) || Number.isNaN(serviceId)) return router.replace("/404");

          let newEvent = new Service(token, serviceId);

          let result = await newEvent.getEvent(newId);

          if (typeof result === "number")
            return
          try {
            let newNodes = {};
            let results = await Service.getAllEvents(token)

            if (typeof results === "number") {
              toast.error("An error has occurred")
              console.log(results)
              return;
            }
            for (const event of results) {
              let service = new Service(token, event.service_id);

              let serviceInfo = await service.get();

              if (typeof serviceInfo === "number") continue;
              newNodes[event.name] = {
                "categories": "events",
                "name": event.name,
                "eventID": event.id,
                "service": serviceInfo.name,
                inputs: [
                  {
                    "id": "argument_1",
                    "type": HandleTypes.ANY
                  }
                ],
                outputs: [
                  {
                    "id": "exit",
                    "type": HandleTypes.ANY,
                  },
                ],
                "background": "#28c76f"
              }
            }
            setNodes(newNodes)
          } catch (e) {
            toast.error("An error has occurred")
            console.log(e)
          }
          setService(newEvent)
          setInfo(result)
          setTitle(result.name)
          setDescription(result.description)
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
                      {info.name}
                    </Typography>
                }
                subtitle={
                  <Typography sx={{ color: 'text.secondary' }}>
                    {info.description}
                  </Typography>
                }
            />
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => setShowEdit(true)}>Edit Event</Button>
            </Grid>
            <Grid item xs={12} height={"65vh"}>
              <WorkflowComponent value={{
                "nodes": info.workflow.nodes || [],
                "edges": info.workflow.edges || []
              }} onChange={onChange} events={nodes} />
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
                        Edit Event
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{info.name}'s edition</Typography>
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
                  try {
                    let result = await service.editEvent(info.id, {
                      name: title,
                      description
                    })

                    if (typeof result === "number") {
                      toast.error("An error has occurred")
                      console.log(result)
                    } else {
                      toast.success("The event has been updated successfully")
                      router.reload()
                    }
                  } catch (e) {
                    console.log(e)
                    toast.error("An error has occurred")
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
