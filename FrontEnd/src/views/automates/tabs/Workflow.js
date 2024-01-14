import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import WorkflowComponent from "../../workflow/Workflow";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {Service} from "../../../models/Services";
import {HandleTypes} from "../../workflow/Nodes/nodes";
import Spinner from "../../../@core/components/spinner";

export default function Workflow({info, automate, token}) {
    const [value] = useState({
      "nodes": info.workflow.nodes || [],
      "edges": info.workflow.edges || []
    });
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [nodes, setNodes] = useState({});

    useEffect(() => {
      (async () => {
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
        setLoading(false)
      })()
    }, []);

    const onChange = async (workflow) => {
      try {
        let result = await automate.editWorkflow(workflow)

        if (typeof result === "number")
          toast.error("An error has occurred")
        else {
          toast.success("The workflow has edited successfully")
          router.reload()
        }
      } catch (e) {
        console.log(e)
        toast.error("An error has occurred")
      }
    }

    if (isLoading)
      return <Spinner />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} height={"60vh"}>
                <WorkflowComponent value={value} onChange={onChange} events={nodes} />
            </Grid>
        </Grid>
    )
}
